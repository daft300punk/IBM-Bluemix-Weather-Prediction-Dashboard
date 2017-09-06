import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NumberStat from 'components/NumberStat';
import Button from 'components/Button';
import './styles.scss';

const arrowUp = require('../../../assets/images/ic-up.png');
const arrowDown = require('../../../assets/images/ic-down.png');

/**
 * This renders one row of information on dashboard home page.
 * TODO: Implement functionality of notify and action buttons( not clear in design ).
 */
class Card extends Component {
  constructor(props) {
    super(props);

    // Card can be expanded to show more details in each row.
    this.state = {
      isExpanded: false,
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(e) {
    e.preventDefault();
    const newState = !this.state.isExpanded;
    this.setState({
      isExpanded: newState,
    });
  }

  render() {
    const {
      id,
      title,
      location,
      detailsText,
      cause,
      effect,
      chance,
      sales,
      costs,
      acmeKpi,
      date,
    } = this.props;

    const active = this.state.isExpanded ? 'active' : '';

    // set side border color style
    let color;
    if (sales.increasing) color = 'green';
    else if (sales.isSevere) color = 'red';
    else color = 'tangerine';
    const classname = `card ${color}Border ${active}`;

    // arrow used to expand and collapse card
    const arrow = this.state.isExpanded ? arrowUp : arrowDown;

    return (
      <div styleName={classname}>
        <div styleName="upperContent">
          <div
            styleName="title info"
            onClick={e => this.toggleView(e)}
            role="button"
            tabIndex={0}
          >
            <h3>{title}, {location}</h3>
            <p>{cause}, {effect} -- Date: {moment(date, 'MMDDYYYY').format('ll')}</p>
          </div>
          <NumberStat
            percentage={chance}
            description="Chance"
          />
          <NumberStat
            percentage={sales.value}
            isIncreasing={sales.increasing}
            isSevere={sales.isSevere}
            description="Sales"
          />
          <NumberStat
            percentage={costs.value}
            isIncreasing={costs.increasing}
            isSevere={costs.isSevere}
            description="Costs"
          />
          <NumberStat
            percentage={acmeKpi.value}
            isIncreasing={acmeKpi.increasing}
            isSevere={acmeKpi.isSevere}
            description="Acme KPI"
          />
          <button
            onClick={e => this.toggleView(e)}
          >
            <img src={arrow} alt="toggle info" />
          </button>
        </div>
        <div styleName="lowerContent">
          <p>{detailsText}</p>
          <div styleName="buttonContainer">
            <Link to={`dashboard/suggestions/${id}`}><Button>View Suggestions</Button></Link>
            <div styleName="spaceBetween" />
            <Button type="line">Notify</Button>
            <Button type="line">Action 1</Button>
            <Button type="line">Action 2</Button>
          </div>
        </div>
      </div>
    );
  }


}

const shape = {
  increasing: PropTypes.bool,
  value: PropTypes.string,
  isSevere: PropTypes.bool,
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cause: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  detailsText: PropTypes.string.isRequired,
  effect: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
  sales: PropTypes.shape(shape).isRequired,
  costs: PropTypes.shape(shape).isRequired,
  acmeKpi: PropTypes.shape(shape).isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
