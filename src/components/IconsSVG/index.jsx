// Libs
import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';
import React, {PropTypes} from 'react';
import classnames from 'classnames/bind';

const __svg__ = {
  path: '../../images/svg/**/*.svg',
  name: 'static/[hash].icon.svg'
};

svgxhr(__svg__);


// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);


const Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    glyph : PropTypes.string.isRequired,
    height : PropTypes.number,
    width : PropTypes.number,
  },

  getDefaultProps() {
    return {
      width: 20,
      height: 20
    };
  },

  render() {
    let className = 'icon';
    const { glyph, width, height } = this.props;

    return (
      <svg className={ cx(className) } width={ width } height={ height } role='img'>
        <use xlinkHref={`#${glyph}`} />
      </svg>
    );
  }

});


export default Icon;
