// Libs
import React, { PropTypes } from 'react';
import update from 'immutability-helper';

require('../../style/global.scss');

// Styles
import styles from './style.scss';

// Components
import Header from '../../components/Header';
import Cart from '../../components/Cart';

const Layout = React.createClass({
  displayName: 'Layout',

  propTypes: {
    children: PropTypes.node
  },

  getInitialState: function(){
    return {
      sidebarOpen: false,
      itemsInCart: []
    };
  },

  handleViewCart() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  },

  updateCart(items) {
    this.setState({ itemsInCart: items });
  },

  removeItemFromCart(item) {
    let cartItemIndex = this.state.itemsInCart.findIndex(
      cartItem => cartItem.title === item.title);
    if (cartItemIndex !== -1) {
      let cartItemsList = this.state.itemsInCart.slice();
      cartItemsList.splice(cartItemIndex, 1);
      this.setState({ itemsInCart: cartItemsList });
    } else {
      console.error('No item with name ${item.name} in the shopping cart');
    }
  },

  addItemToCart(item) {
    let items = this.state.itemsInCart;

    let existingItem = items.findIndex(
      hasItem => hasItem.id === item.id);

    if (existingItem !== -1) {
      if (items[existingItem].quantity === undefined) {
        items[existingItem].quantity = 0;
      }
      items[existingItem].quantity = items[existingItem].quantity + 1;
    } else {

      items.push({
        title: item.title,
        currencyFormat: item.currencyFormat,
        price: item.price,
        id: item.id,
        quantity: 1,
      });
    }

    let cartItems = update(this.state.itemsInCart, {$set: items });
    this.updateCart(cartItems);
  },


  render() {
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        addItemToCart: this.addItemToCart
      });
    }.bind(this));

    return (
      <div className={ styles['app'] }>

        <div className={ styles['app-header'] }>
          <div className={ styles['app-header-wrapper'] }>
            <Header pageTitle={'Products'} onClick={this.handleViewCart} />
          </div>
        </div>

        <div className={ styles['app-content'] }>

          <div className={ styles['app-content-wrapper'] }>
            <main className={ styles.main }>
              { childrenWithProps }
            </main>
            <Cart items={ this.state.itemsInCart }
              isOpen={ this.state.sidebarOpen }
              onItemRemovedFromCart={ this.removeItemFromCart } />
          </div>

        </div>
      </div>
    );
  }
});

export default Layout;
