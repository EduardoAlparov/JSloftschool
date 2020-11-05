import { sendForm } from './request';

export default {
  init(root) {
    const form = root.querySelector('[data-action]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('submit');
      try {
        const resData = await sendForm(e.target);

        if (resData.status) {
          location.replace('/chat/#login');
        }

        alert(resData.message);
      } catch (error) {
        alert(error.message);
      }
    });
  },
};
