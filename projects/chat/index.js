import './index.html';
import './sass/main.scss';
import './router';
import Store from './modules/store';

const store = new Store({
  user: {},
});

export default store;
