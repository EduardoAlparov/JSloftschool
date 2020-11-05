import { sendForm } from './request';
import store from '../index';

export default {
  init(root) {
    const form = root.querySelector('[data-action]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const resData = await sendForm(e.target);

        if (resData.id && resData.token) {
          store.setState('user', { id: resData.id });
          localStorage.setItem('token', resData.token);

          return location.replace(`/chat/#chat`);
        } else {
          alert(resData.message);
        }
      } catch (error) {
        alert(error.message);
      }
    });
  },
};
