// Libs
import React, {PropTypes} from 'react';

// Styles
import styles from './style.scss';

const Buybox = React.createClass({
  displayName: 'Buybox',

  propTypes: {
    currencyFormat:   PropTypes.string.isRequired,
    installments:     PropTypes.number.isRequired,
    price:            PropTypes.number.isRequired
  },

  render() {
    //${ this.props.currencyFormat }
    const priceArr= this.props.price.toFixed(2).split('.');
    const priceDecimals = priceArr[0];
    const priceThousands = priceArr[1];
    const installmentsPrice = (this.props.price / this.props.installments).toFixed(2).replace('.', ',');

    return (
      <div className={ styles['buybox'] }>
        <p className={ styles['buybox-price'] }>
          { this.props.currencyFormat }{' '}
          <strong className={ styles['buybox-price-decimals'] }>{ priceDecimals }</strong>
          <span className={ styles['buybox-price-thousands'] }>{','}{ priceThousands }</span>
        </p>
        <div className={ styles['buybox-installments'] }>
          {'Ou'}{' '}
          <span className={ styles['buybox-installments-text'] }>{ this.props.installments }</span>
          {'x de'}{' '}
          <strong className={ styles['buybox-installments-price'] }>
            { this.props.currencyFormat } {installmentsPrice}
          </strong>
        </div>
      </div>
    );
  }
});

export default Buybox;
