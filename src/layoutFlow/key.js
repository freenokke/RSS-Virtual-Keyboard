export default class Key {
  constructor(parent, className, content, keyboard, isMode, tagName = 'button') {
    const el = document.createElement(tagName);
    const [className1, className2] = className;
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
