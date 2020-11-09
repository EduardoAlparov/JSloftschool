function render(selector, templateName, data = {}) {
  const container = document.querySelector(selector);
  const templateHTML = require(`../templates/${templateName}.hbs`)(data);

  container.innerHTML = templateHTML;
}

export default {
  render
}