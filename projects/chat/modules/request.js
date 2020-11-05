import { formDataToJson } from './helpers';

export function sendForm(form) {
  const route = form.dataset.action;
  const data = formDataToJson(form);

  return fetch(`http://localhost:3000/api/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function get(url) {
  return fetch(`http://localhost:3000${url}`, {
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
  }).then((res) => res.json());
}
