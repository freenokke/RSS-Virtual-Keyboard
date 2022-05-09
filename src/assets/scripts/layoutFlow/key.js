export default class Key {
  constructor(parent, className, content, keyboard, isMode, tagName = 'button') {
    const el = document.createElement(tagName);
    const [className1, className2] = className; // <== Деструктуризация
    el.className = `${className1} ${className2}`;
    el.innerHTML = content;
    this.keyboard = keyboard;
    this.parent = parent;
    this.content = content;
    if (!isMode) {
      el.addEventListener('click', () => {
        keyboard.print(this.content);
      });
    }
    el.addEventListener('mousedown', () => {
      el.classList.add('pressed');
      el.addEventListener('mouseleave', () => {
        el.classList.remove('pressed');
      });
    });
    el.addEventListener('mouseup', () => {
      el.classList.remove('pressed');
    });
    this.node = el;
  }

  setContent(content) {
    this.node.innerHTML = content;
    this.content = content;
  }

  setClassName(className) {
    this.node.className = className;
  }

  render() {
    this.parent.appendChild(this.node);
  }
}
