import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

/**
 * Button Component
 * Defaults to a filled button.
 * Pass type='line' to create a line button.
 * Children is React Element.
 * pass style to override default style.
 * @param {any} {
 *   type,
 *   children,
 *   style,
 * }
 */
const Button = ({
  type,
  children,
  style,
}) => (
  <button styleName={`btn ${type}`} style={style}>{children}</button>
);

Button.defaultProps = {
  type: '', // defaults to filled button
  style: {},
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
};

export default Button;
