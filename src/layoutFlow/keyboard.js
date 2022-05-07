import Main from './template';

export default class Keyboard extends Main {
  isShiftKey = false;

  constructor(parent, tag, classes, textarea, startlanguage) {
    super(parent, tag, classes);
    this.startlanguage = startlanguage;
    this.textarea = textarea;
  }

  print(key) {
    this.textarea.focus();
    this.textarea.value += key;
  }
}
