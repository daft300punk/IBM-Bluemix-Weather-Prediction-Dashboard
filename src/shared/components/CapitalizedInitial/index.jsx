import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

/**
 * Creates a circule with capitalized initials of user's name inside.
 * name should be an object as shown below
 * {
 *  firstName: 'daft',
 *  lastName: 'punk',
 * }
 */
const CapitalizedInitial = ({ name }) => {
  const first = name.firstName.charAt(0).toUpperCase();
  const second = name.lastName.charAt(0).toUpperCase();
  return (
    <h4 styleName="capitalizedInitials">
      {`${first}${second}`}
    </h4>
  );
};

CapitalizedInitial.propTypes = {
  name: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default CapitalizedInitial;
