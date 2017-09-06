import React from 'react';
import './styles.scss';

const dictateIcon = require('../../../assets/images/ic-dictate.png');

/*
* Chatbar rendered at the bottom of screen.
* TODO: On text submission, just update redux chat state, and chatbox will
* take care of showing it.
*/
const Chatbar = () => (
  <div styleName="chatbarContainer">
    <div styleName="chatbar">
      <input type="text" placeholder="Your message" />
      <button><img src={dictateIcon} alt="Dictate" /></button>
    </div>
  </div>
);


export default Chatbar;
