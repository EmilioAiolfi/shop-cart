// Libs
import React, {PropTypes} from 'react';

import Card from '../Card';

// Styles
import styles from './style.scss';

const Shelf = React.createClass({
  displayName: 'Shelf',

  propTypes: {
    data: PropTypes.object.isRequired,
    onItemAddedToCart: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      data: {},
      onClick: function(){}
    };
  },

  getImage() {
    return 'static/img/products/' + this.props.data.id + '.png';
  },

  handleClick() {
    this.props.onItemAddedToCart(this.props.data);
  },

  render() {
    return (
      <div className={ styles['shelf-item'] }>
        <Card
          srcImage={ `static/img/products/${this.props.data.id}.png` }
          title={ this.props.data.title }
          currencyFormat={ this.props.data.currencyFormat }
          price={ this.props.data.price }
          installments={ this.props.data.installments }
          onClick={ this.handleClick } />
      </div>
    );
  }
});

export default Shelf;
