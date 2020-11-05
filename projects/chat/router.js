import controller from './modules/controller';
import { get } from './modules/request';
import store from './index';

window.addEventListener('load', async () => {
  if (localStorage.getItem('token')) {
    try {
      const data = await get('/api/profile');
      if (data.status) {
        store.setState('user', data.user);
        location.replace('/chat/#chat');
      } else {
        store.setState('user', {});
        location.replace('/chat/#login');
        alert(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    location.replace('/chat/#login');
  }

  addEventListener('hashchange', () => changeHash());
  changeHash();
});

function getRouteInfo() {
  const hash = location.hash ? location.hash.slice(1) : '';

  return { hash };
}

function changeHash() {
  const { hash } = getRouteInfo();
  const routeName = `render${hash.charAt(0).toUpperCase() + hash.slice(1)}`;

  try {
    controller[routeName]();
  } catch (error) {
    location.replace('/chat/#login');
  }
}
