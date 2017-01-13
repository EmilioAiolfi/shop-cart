// Libs
import React, {PropTypes} from 'react';
import Buybox from '../Buybox';

// Styles
import styles from './style.scss';

const Card = React.createClass({
  displayName: 'Card',

  propTypes: {
    currencyFormat: PropTypes.string.isRequired,
    installments:   PropTypes.number.isRequired,
    onClick:        PropTypes.func.isRequired,
    price:          PropTypes.number.isRequired,
    srcImage:       PropTypes.string.isRequired,
    title:          PropTypes.string.isRequired
  },

  render() {
    return (
      <div className={ styles['card'] }>
        <div className={ styles['card-image'] }>
          <img src={ this.props.srcImage } />
        </div>
        <h2 className={ styles['card-title'] }>
          { this.props.title }
        </h2>
        <Buybox
          currencyFormat={ this.props.currencyFormat }
          price={ this.props.price }
          installments={ this.props.installments } />
        <button onClick={ this.props.onClick }>{'Add to cart'}</button>
      </div>
    );
  }
});

export default Card;
