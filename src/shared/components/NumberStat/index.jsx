import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import ArrowFillUp from '../../../assets/images/arrow-fill-up.svg';
import ArrowFillDown from '../../../assets/images/arrow-fill-down.svg';

/**
 * See the percentage styled number in a row on route /dashboard.
 */
const NumberStat = ({
  percentage,
  description,
  isIncreasing,
  isSevere,
}) => {
  let color;
  if (isIncreasing) color = 'green';
  else if (isSevere) color = 'red';
  else color = 'tangerine';

  let Icon = isIncreasing ? ArrowFillUp : ArrowFillDown;
  if (isIncreasing === undefined) {
    Icon = null;
    color = '';
  }
  return (
    <div styleName="numberStat">
      <div styleName="numberContainer">
        <h3 styleName={`${color}`}>{percentage}</h3>
        {Icon && <Icon styleName={`${color}`} />}
      </div>
      <p>{description}</p>
    </div>
  );
};

NumberStat.propTypes = {
  percentage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isIncreasing: PropTypes.bool,
  isSevere: PropTypes.bool,
};

export default NumberStat;
