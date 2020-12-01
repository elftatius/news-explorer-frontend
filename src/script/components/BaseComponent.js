export default class BaseComponent {
  onClick(selector, func) {
    const element = this._element.querySelector(selector)
    if (!element) {
      return;
    }
    element.addEventListener('click', func);
  }

  _renderTemplate(html) {
    const template = document.createElement("template")
    template.innerHTML = html;
    return template.content.cloneNode(true).children[0];
  }
}