import view from './view';
import login from './login';
import registration from './registration';
import chat from './chat';
import store from '../index';

function renderChat() {
  if (store.getState('user').id) {
    view.render('#chat-container', 'pages/chat');
    chat.init(document.querySelector('[data-page="chat"]'));
  } else {
    location.replace('/chat/#login');
  }
}

function renderLogin() {
  if (store.getState('user').id) {
    location.replace('/chat/#chat');
  } else {
    view.render('#chat-container', 'pages/login');
    login.init(document.querySelector('[data-page="login"]'));
  }
}

function renderRegistration() {
  view.render('#chat-container', 'pages/registration');
  registration.init(document.querySelector('[data-page="registration"]'));
}

export default {
  renderRegistration,
  renderLogin,
  renderChat,
};
