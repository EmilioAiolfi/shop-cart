// Libs
import React, { PropTypes } from 'react';
import Icon from '../IconsSVG';

// Style
import styles from './style.scss';

const Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    brandName : PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick:  PropTypes.func.isRequired,
    pageTitle : PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      brandName : '',
      pageTitle : ''
    };
  },
  
  getInitialState() {
    return { sidebarOpen: false };
  },

  render() {
    return (
      <header className={ styles['header'] }>

        <div className={ styles['brand'] }>
          <h1>
            <a className={ styles['logo'] }>
              <Icon glyph="icon-ns-logo" width={ 210 } height={ 22 }  />
              <span className={ styles['text'] }>{ this.props.brandName }</span>
            </a>
          </h1>
        </div>

        <div className={ styles['page-details'] }>
          <h2 className={ styles['page-title'] }>{ this.props.pageTitle }</h2>
        </div>

        <div className={ styles['settings'] }>
          <div className={ styles['menu-button-cart'] }>
            <button onClick={this.props.onClick}>{'Cart'}</button>
          </div>
        </div>

      </header>
    );
  }
});

export default Header;
