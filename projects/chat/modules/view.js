function render(containerName, templateURL, data = {}, clean = true) {
  const container = document.querySelector(containerName);
  const templateHTML = require(`../templates/${templateURL}.pug`)(data);

  if (clean) {
    container.innerHTML = templateHTML;
  } else {
    container.innerHTML += templateHTML;
  }
}

export default {
  render,
};
