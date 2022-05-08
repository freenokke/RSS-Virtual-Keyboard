import Main from './template';
import enCode from '../keyboardData/en';

export default class Keyboard extends Main {
  isCapsLock = false;

  constructor(parent, tag, classes, textarea, startlanguage) {
    super(parent, tag, classes);
    this.startlanguage = startlanguage;
    this.textarea = textarea;
  }

  print(key) {
    this.textarea.value += key;
    this.textarea.focus();
  }

  backspace() {
    const textLength = this.textarea.value.length;
    const beforeSelect = this.textarea.value.substr(0, this.textarea.selectionStart);
    const afterSelect = this.textarea.value.substr(this.textarea.selectionEnd, textLength);
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.textarea.value = beforeSelect + afterSelect;
      this.textarea.focus();
      this.textarea.selectionStart = beforeSelect.length;
      this.textarea.selectionEnd = beforeSelect.length;
    } else if (this.textarea.selectionStart === this.textarea.selectionEnd
      && this.textarea.selectionStart < textLength) {
      this.textarea.value = beforeSelect.substr(0, beforeSelect.length - 1) + afterSelect;
      this.textarea.focus();
      this.textarea.selectionStart = beforeSelect.length - 1;
      this.textarea.selectionEnd = beforeSelect.length - 1;
    } else {
      this.textarea.value = this.textarea.value.substr(0, textLength - 1);
      this.textarea.focus();
      this.textarea.selectionStart = this.textarea.value.length;
      this.textarea.selectionEnd = this.textarea.value.length;
    }
  }

  enter() {
    this.textarea.value += '\n';
    this.textarea.focus();
  }

  tab() {
    this.textarea.value += '    ';
    this.textarea.focus();
  }

  delete() {
    const textLength = this.textarea.value.length;
    const beforeSelect = this.textarea.value.substr(0, this.textarea.selectionStart);
    const rest = this.textarea.value.substr(this.textarea.selectionStart, textLength);
    this.textarea.value = beforeSelect + rest.substr(1, rest.length);
    this.textarea.focus();
    this.textarea.selectionStart = beforeSelect.length;
    this.textarea.selectionEnd = beforeSelect.length;
  }

  capslock(keys, button) {
    if (this.isCapsLock === false) {
      this.isCapsLock = true;
      keys.forEach((item, index) => {
        item.setContent(enCode[index].shift);
      });
      button.classList.add('active');
    } else {
      keys.forEach((item, index) => {
        item.setContent(enCode[index].key);
      });
      this.isCapsLock = false;
      button.classList.remove('active');
    }
    this.textarea.focus();
  }

  shift(keys, button) {
    if (this.isCapsLock === false) {
      this.isCapsLock = true;
      button.classList.add('active');
      keys.forEach((item, index) => {
        item.setContent(enCode[index].shift);
      });
      this.node.onclick = (e) => {
        if (e.target.classList.contains('key')) {
          keys.forEach((item, index) => {
            item.setContent(enCode[index].key);
            this.node.onclick = null;
          });
          button.classList.remove('active');
          this.isCapsLock = false;
        }
      };
    }
    this.textarea.focus();
  }
}
