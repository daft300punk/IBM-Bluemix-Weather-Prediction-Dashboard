import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import NumberStat from 'components/NumberStat';
import './styles.scss';

/**
 * The card rendered on /dashboard/suggestions/:id route
 */
const SuggestionsCard = ({
  title,
  text,
  sales,
  costs,
  acmeKpi,
}) => (
  <div styleName="suggestionsCard">
    <div styleName="mainContent">
      <div styleName="contentDescription">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <div styleName="stat">
        <NumberStat
          percentage={sales.value}
          isSevere={sales.isSevere}
          description="Sales"
          isIncreasing={sales.increasing}
        />
        <NumberStat
          percentage={costs.value}
          isSevere={costs.isSevere}
          description="Costs"
          isIncreasing={costs.increasing}
        />
        <NumberStat
          percentage={acmeKpi.value}
          isSevere={acmeKpi.isSevere}
          description="Acme KPI"
          isIncreasing={acmeKpi.increasing}
        />
      </div>
    </div>
    <div styleName="buttonContainer">
      <Button>Apply</Button>
      <Button type="line">Simulate</Button>
    </div>
  </div>
);

SuggestionsCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sales: PropTypes.shape({}).isRequired,
  costs: PropTypes.shape({}).isRequired,
  acmeKpi: PropTypes.shape({}).isRequired,
};

export default SuggestionsCard;
