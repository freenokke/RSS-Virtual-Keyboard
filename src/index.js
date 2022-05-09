import './assets/sass/style.sass';
import enCode from './keyboardData/en';
import ruCode from './keyboardData/ru';
import Main from './layoutFlow/template';
import Keyboard from './layoutFlow/keyboard';
import Key from './layoutFlow/key';

const textArea = new Main(document.body, 'textarea', 'keyboard-textarea'); // (parent, tag, class)
textArea.create();

const keyboardWrapper = new Main(document.body, 'div', 'keyboard-container'); // (parent, tag, class)
keyboardWrapper.create();

const keyboard = new Keyboard(keyboardWrapper.node, 'div', 'keyboard', textArea.node, 'en'); // (parent, tag, class, textarea, language)
keyboard.create();

let keyArr = null;
function generateArrDependOnLang(lang) {
  let arr = null;
  if (lang === 'en') {
    arr = enCode;
  } else {
    arr = ruCode;
  }
  keyArr = arr.map((item) => {
    const classes = ['key', item.code];
    const key = new Key(keyboard.node, classes, item.key, keyboard, item.modeKey);
    // parent, class, content, keyboard, isMode, tagName = 'button'
    return key;
  });
}



function renderKeys(keys) {
  keys.forEach((item) => {
    item.render();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.ctrlKey) {
    if (window.localStorage.getItem('lang') === 'en') {
      window.localStorage.setItem('lang', 'ru');
      keyboard.lang = 'ru';
      keyArr.forEach((item, index) => {
        if (keyboard.isCapsLock === true) {
          item.setContent(ruCode[index].shift);
        } else {
          item.setContent(ruCode[index].key);
        }
      });
    } else {
      window.localStorage.setItem('lang', 'en');
      keyboard.lang = 'en';
      keyArr.forEach((item, index) => {
        if (keyboard.isCapsLock === true) {
          item.setContent(enCode[index].shift);
        } else {
          item.setContent(enCode[index].key);
        }
      });
    }
  }
});

function renderKeys(keys) {
  keys.forEach((item) => {
    item.render();
  });
}

keyboard.node.addEventListener('click', (e) => {
  if (e.target.innerText === 'Shift') {
    keyboard.shift(keyArr, e.target);
  }
  if (e.target.innerText === 'Backspace') {
    keyboard.backspace();
  }
  if (e.target.innerText === 'Enter') {
    keyboard.enter();
  }
  if (e.target.innerText === 'Tab ⭾') {
    keyboard.tab();
  }
  if (e.target.innerText === 'Del') {
    keyboard.delete();
  }
  if (e.target.innerText === 'CapsLock') {
    keyboard.capslock(keyArr, e.target);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let language = window.localStorage.getItem('lang');
  if (language) {
    generateArrDependOnLang(language);
    renderKeys(keyArr);
  } else {
    window.localStorage.setItem('lang', 'en');
    language = window.localStorage.getItem('lang');
    generateArrDependOnLang(language);
    renderKeys(keyArr);
  }
  keyboard.lang = language;
});
document.addEventListener('keydown', () => {
  textArea.node.focus();
});
