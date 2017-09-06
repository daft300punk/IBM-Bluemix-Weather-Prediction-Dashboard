import React from 'react';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import './file.scss';

const fileIcon = require('../../../assets/images/ic-file.png');

/**
 * Renders file view component when the bot is asked for files.
 * TODO: Implement functionality of view and remove buttons.
 */
const FileView = ({
  data,
}) => (
  <div styleName="fileViewContainer">
    {
      data.length && data.map(item => (
        <div styleName="fileView" key={item.title}>
          <div styleName="titleContainer">
            <img src={fileIcon} alt="File Icon" />
            <div styleName="info">
              <h4>{item.title}</h4>
              <p>{item.info}</p>
            </div>
          </div>
          <div styleName="buttonContainer">
            <Button type="line">View</Button>
            <Button type="line">Remove</Button>
          </div>
        </div>
      ))
    }
  </div>
);

FileView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  })).isRequired,
};

export default FileView;
