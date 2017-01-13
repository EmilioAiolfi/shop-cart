// Libs
import React, {PropTypes} from 'react';
import classnames from 'classnames/bind';

// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);

const Cart = React.createClass({
  displayName: 'Cart',

  propTypes: {
    isOpen:                 PropTypes.bool.isRequired,
    items:                  PropTypes.array.isRequired,
    onItemRemovedFromCart:  PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      items: [],
      onRemove: function(){}
    };
  },

  render() {
    const { isOpen, items, onItemRemovedFromCart } = this.props;

    const cn = cx('cart-content', {
      ['active']: isOpen
    });

    const itemNodes = items.map(function (item, index) {
      return (
        <CartItem key={ index } item={ item } onRemove={ onItemRemovedFromCart }  />
      );
    }.bind(this));

    return (
      <div className={ cn }>
        <CartHeader itemsCount={ items.length } text={ 'Sacola' } />
        {itemNodes}
      </div>
    );
  }
});


const CartItem = React.createClass({
  displayName: 'CartItem',

  propTypes: {
    handleClick:  PropTypes.func.isRequired,
    item:         PropTypes.object.isRequired,
    onRemove:     PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      item: {},
      handleClick: function(){}
    };
  },

  handleClick() {
    this.props.onRemove(this.props.item);
  },

  render() {
    const price = this.props.item.currencyFormat + ' ' + (this.props.item.quantity * this.props.item.price).toFixed(2).replace('.', ',');
    return (
      <div className={ cx['cart-item'] }>
        <div className={ cx['cart-item-content-image'] }>
          <img className={ cx['cart-item-product-image'] } src={ `static/img/products/${this.props.item.id}.png` } />
        </div>
        <div className={ cx['cart-item-content-info'] }>
          <p className={ cx['cart-item-title'] }>
            {this.props.item.title}
          </p>
          <p className={ cx['cart-item-info'] }>
            {'Quantidade:'} {this.props.item.quantity}
          </p>
        </div>
        <div className={ cx['cart-item-content-total'] }>
          <button className={ cx['btn-remove'] } onClick={ this.handleClick }>{ 'X' }</button>
          <p className={ cx['cart-item-price'] }>
            {price}
          </p>
        </div>

      </div>
    );
  }
});


const CartHeader = React.createClass({
  displayName: 'CartHeader',

  propTypes: {
    items:      PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    text:       PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      items: 0
    };
  },

  render() {
    return (
      <header className={ styles['cart-header'] }>
        <p>{ this.props.itemsCount }</p>
        <p>{ this.props.text }</p>
      </header>
    );
  }
});


export default Cart;
