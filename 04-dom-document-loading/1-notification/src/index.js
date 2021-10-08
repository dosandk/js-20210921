export default class NotificationMessage {
  element;

  constructor(message = '', {
    duration = 2000,
    type = 'success'
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<div class="${this.type}">${this.message}</div>`;

    this.element = wrapper.firstElementChild;
  }

  show () {

  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
  }
}
