export default class Main {
  constructor(parent, tag, classes) {
    this.parent = parent;
    this.classes = classes;
    this.tag = tag;
  }

  create() {
    const el = document.createElement(this.tag);
    el.classList.add(this.classes);
    this.node = el;
    this.parent.append(this.node);
  }
}
