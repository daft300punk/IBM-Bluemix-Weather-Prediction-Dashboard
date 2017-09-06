import React from 'react';
import CapitalizedInitial from '../CapitalizedInitial';
import './styles.scss';

const logo = require('../../../assets/images/logo.png');
const notificationIcon = require('../../../assets/images/ic-bel.png');
const settingsIcon = require('../../../assets/images/ic-settings.png');

/**
 * Header component
 */
const Header = () => (
  <div styleName="headerContainer">
    <img src={logo} alt="logo" />
    <h3>IBM Weather Analytics</h3>
    <button><img src={notificationIcon} alt="notification button" /></button>
    <button><img src={settingsIcon} alt="settings button" /></button>
    <button><CapitalizedInitial name={{ firstName: 'daft', lastName: 'punk' }} /></button>
  </div>
);

export default Header;
