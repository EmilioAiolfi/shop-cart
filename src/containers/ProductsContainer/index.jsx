// Libs
import React, { PropTypes } from 'react';

// Styles
import styles from './style.scss';

// Components
import Shelf from '../../components/Shelf';

// Data Products
import ProductData from '../../data/products';

const ProductsContainer = React.createClass({
  displayName: 'ProductsContainer',

  propTypes: {
    addItemToCart: PropTypes.func.isRequired,
    children: PropTypes.node
  },

  getDefaultProps() {
    return {
      itemsInCart: [],
      addItemToCart: function(){}
    };
  },

  getInitialState() {
    return {
      loading: true,
      timer: null,
      shelfItems: []
    };
  },
  
  componentDidMount() {
    const timer = setTimeout( ()=> {
      ProductData.init();
      this.getProductData();
    }, 2000 );

    this.setTimer(timer);
  },

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  },

  getProductData() {
    let data = JSON.parse(localStorage.getItem('product'));
    this.setState({
      shelfItems: data[0].products,
      loading: false,
    });
  },

  setTimer(timer) {
    this.setState({timer});
  },

  render() {
    let products = this.state.shelfItems;
    let itemNodes = products.map(function (item, index) {
      return (
        <Shelf
          key={ index }
          data={ 
            item }
          onItemAddedToCart={ this.props.addItemToCart } />
      );
    }.bind(this));

    return (
      <div className={ styles['shelf-container'] }>
        <div className={ styles['shelf-list'] }>
          { itemNodes }
        </div>
      </div>
    );
  }
});

export default ProductsContainer;
