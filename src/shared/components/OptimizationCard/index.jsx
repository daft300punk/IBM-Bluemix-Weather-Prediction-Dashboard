import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import OptimizationIcon from '../../../assets/images/optimization.svg';
import ArrowFillUp from '../../../assets/images/arrow-fill-up.svg';
import './styles.scss';

/**
 * See Optimization Card component in route /dashboard.
 */
class OptimizationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptimization: 0,
    };
    this.changeSelectedOptimization = this.changeSelectedOptimization.bind(this);
  }

  changeSelectedOptimization(num) {
    this.setState({
      selectedOptimization: num,
    });
  }

  render() {
    const selectedOptimization = this.state.selectedOptimization;
    let optimization;
    if (this.props.optimizations) {
      optimization = (this.props.optimizations && this.props.optimizations[selectedOptimization]);
    }
    return optimization ? (
      <div styleName="optimizationCard">
        <h4>Optimization</h4>
        <div styleName="optimizationNumber">
          <OptimizationIcon />
          <div styleName="number">
            {optimization.percentage}
            <ArrowFillUp fill="rgba(255, 255, 255, .5)" />
          </div>
        </div>
        <h5>{optimization.title}</h5>
        <p>{optimization.description}</p>
        <div styleName="buttonContainer">
          <Button type="line">Analytics</Button>
          <Button type="line">Apply</Button>
        </div>
        <div styleName="dotContainer">
          {
            this.props.optimizations.map((op, index) => {
              const className = index === this.state.selectedOptimization ? 'active' : '';
              return (
                <div
                  styleName={`dot ${className}`}
                  key={index}
                  onClick={() => this.changeSelectedOptimization(index)}
                  role="button"
                  tabIndex={0}
                />
              );
            })
          }
        </div>
      </div>
    ) : null;
  }
}

OptimizationCard.defaultProps = {
  optimizations: [],
};

OptimizationCard.propTypes = {
  optimizations: PropTypes.arrayOf(PropTypes.shape({})),
};

export default OptimizationCard;
