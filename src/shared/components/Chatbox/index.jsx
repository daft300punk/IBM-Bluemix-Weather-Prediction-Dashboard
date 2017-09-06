import React from 'react';
import PropTypes from 'prop-types';
import CapitalizedInitial from 'components/CapitalizedInitial';
import FileView from './file';
import './styles.scss';

const beeIcon = require('../../../assets/images/ic-bee.png');

/**
 * Chatbox component rendered above the chat bar.
 * The bot can pass custom messages to be rendered. See
 * children property of listMessages default prop below.
 *
 * If the message has property isUser set to true, a userMessage
 * component is rendered, which is basically styled text.
 *
 * If the message has property isUser set to false, a botMessage
 * is rendered. This can have children, which is a react element.
 *
 * name is just needed to render the initials of user.
 */
const Chatbox = ({ listMessages, name }) => (
  <div styleName="chatbox">
    {
        listMessages.map((message, index) => {
          if (message.isUser) {
            return (
              <div styleName="userMessage" key={index}>
                <div styleName="userMessageText">
                  <p>{message.text}</p>
                </div>
                <CapitalizedInitial name={name} />
              </div>
            );
          }
          return (
            <div styleName="botMessage" key={index}>
              <div styleName="botMessageIcon">
                <img src={beeIcon} alt="ibm bot" />
              </div>
              <div styleName="botMessageContent">{message.children}</div>
            </div>
          );
        })
      }
  </div>
  );

// TODO: remove this on connection with redux state.
Chatbox.defaultProps = {
  listMessages: [
    {
      isUser: true,
      text: 'Message Message',
    },
    {
      isUser: false,
      children: <p styleName="normalBotMessage">Here are your current data.</p>,
    },
    {
      isUser: true,
      text: 'Message Message',
    },
    {
      isUser: false,
      children: <FileView data={[{ title: 'Business Sales History', info: 'Acme File Type' }, { title: 'Business Sales History 2', info: 'Acme File Type' }]} />,
    },
    {
      isUser: false,
      children: <p styleName="normalBotMessage">Here are your current data.</p>,
    },
    {
      isUser: true,
      text: 'Message Message',
    },
    {
      isUser: false,
      children: <p styleName="normalBotMessage">Here are your current data.</p>,
    },
    {
      isUser: true,
      text: 'Message Message',
    },
    {
      isUser: false,
      children: <p styleName="normalBotMessage">Here are your current data.</p>,
    },
  ],
  name: {
    firstName: 'daft',
    lastName: 'punk',
  },
};

Chatbox.propTypes = {
  listMessages: PropTypes.arrayOf(PropTypes.shape({})),
  name: PropTypes.shape({}),
};

export default Chatbox;
