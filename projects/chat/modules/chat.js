import store from '../index';
import view from './view';

export default {
  handlers: {
    'users:list': (users) => {
      view.render('[data-role="users"]', 'users', { users });
    },
    'users:add': (user) => {
      view.render('[data-role="users"]', 'user', { user }, false);
      view.render(
        '[data-role="messages"]',
        'message-admin',
        {
          message: `Подключился пользователь ${user.login} :)`,
        },
        false
      );
    },
    'messages:add': (data) => {
      view.render('[data-role="messages"]', 'messages', { data }, false);
      document.querySelector('[data-role="messages"]').scrollTop = document.querySelector('[data-role="messages"]').scrollHeight;
    },
    'users:leave': (user) => {
      document.querySelector(`[data-id="${user.id}"]`).remove();
      view.render(
        '[data-role="messages"]',
        'message-admin',
        {
          message: `пользователь ${user.login} покинул чат :(`,
        },
        false
      );
    },
    'users:photo': (data) => {
      document
        .querySelectorAll(`[data-id="${data.id}"] [data-role="photo"]`)
        .forEach((img) => (img.src = data.path));
    },
    'message:send': (data) => {
      view.render('[data-role="messages"]', 'messagelist', { data }, false);
      document.querySelector('[data-role="messages"]').scrollTop = document.querySelector('[data-role="messages"]').scrollHeight;
      }
  },

  init() {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function () {
      console.log('connect');
      socket.send(
        JSON.stringify({
          event: 'users:connect',
          payload: {
            id: store.getState('user').id,
          },
        })
      );
    };

    socket.onmessage = ({ data }) => {
      data = JSON.parse(data);
      this.handlers[data.event](data.payload);
    };

    const profileBtn = document.querySelector('[data-role="profile"]');
    const upload = document.querySelector('[data-role="upload"]');

    const file = document.querySelector('[data-role="file"]');
    const close = document.querySelector('[data-role="close"]');

    profileBtn.addEventListener('click', () => {
      upload.classList.add('show');
    });

    close.addEventListener('click', () => {
      upload.classList.remove('show');
    });

    file.addEventListener('change', (e) => {
      const reader = new FileReader();

      reader.readAsDataURL(e.currentTarget.files[0]);

      reader.onload = function () {
        document.querySelector(
          '[data-role="preview"]'
        ).style.backgroundImage = `url(${reader.result})`;
      };
    });

    upload.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      formData.append('id', store.getState('user').id);

      fetch(`http://localhost:3000/api/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      upload.classList.remove('show');
    });

    const messageSendButton = document.querySelector('[data-role="message-send-button"]');
    const messageInput = document.querySelector('[data-role="message-input"]');

    messageSendButton.addEventListener('click', (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();

      if (message) {
        socket.send(
          JSON.stringify({
            event: 'users:message',
            payload: {
              id: store.getState('user').id,
              message,
            },
          })
        );
      }
      messageInput.value = '';
    });
  },
};
