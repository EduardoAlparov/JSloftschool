import './index.html';
import './scss/main.scss';
import VKapi from './modules/api.vk';
import view from './modules/view';

(async() => {
  const apiVk = new VKapi(7653817, 2);
  await apiVk.login();

  const [user] = await apiVk.getUser({ fields: 'photo_100' });
  view.render('[data-role=header]', 'header', user);

  const friends = await apiVk.getFriends({ fields: 'photo_100' });
  view.render('[data-role=friends]', 'friends', {
    items: friends.items
  });
})()

