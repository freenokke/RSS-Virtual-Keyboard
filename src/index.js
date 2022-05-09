import './assets/sass/style.sass';
import enCode from './assets/scripts/keyboardData/en';
import ruCode from './assets/scripts/keyboardData/ru';
import Main from './assets/scripts/layoutFlow/template';
import Keyboard from './assets/scripts/layoutFlow/keyboard';
import Key from './assets/scripts/layoutFlow/key';

const infoBlock = new Main(document.body, 'div', 'info'); // (parent, tag, class)
infoBlock.create();
infoBlock.node.innerHTML = '<p>Клавиатура создана в операционной cистеме Windows</p>'
+ '<p>Кобминация клавиш для переключения языка - Alt + Ctrl</p>';

const textArea = new Main(document.body, 'textarea', 'keyboard-textarea'); // (parent, tag, class)
textArea.create();

const keyboardWrapper = new Main(document.body, 'div', 'keyboard-container'); // (parent, tag, class)
keyboardWrapper.create();

const keyboard = new Keyboard(keyboardWrapper.node, 'div', 'keyboard', textArea.node, 'en'); // (parent, tag, class, textarea, language)
keyboard.create();

let keyArr = null;

const keyCodesArr = enCode.map((item) => item.code);
const modeKey = enCode.filter((item) => item.modeKey).map((item) => item.code);

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

function shiftKeyDown(keys) {
  if (window.localStorage.getItem('lang') === 'en') {
    keys.forEach((item, index) => item.setContent(enCode[index].shift));
  } else {
    keys.forEach((item, index) => item.setContent(ruCode[index].shift));
  }
}

function shiftKeyUp(keys) {
  if (window.localStorage.getItem('lang') === 'en') {
    keys.forEach((item, index) => item.setContent(enCode[index].key));
  } else {
    keys.forEach((item, index) => item.setContent(ruCode[index].key));
  }
}

function renderKeys(keys) {
  keys.forEach((item) => {
    item.render();
  });
}

document.addEventListener('keydown', (e) => {
  if (!modeKey.includes(e.code)) {
    e.preventDefault();
    const key = keyArr.find((item) => item.node.classList.contains(e.code));
    keyboard.print(key.node.innerText);
  }
  if (keyCodesArr.includes(e.code)) {
    const key = keyArr.find((item) => item.node.classList.contains(e.code));
    key.node.classList.add('pressed');
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftKeyDown(keyArr);
  }
  if (e.code === 'Tab') {
    e.preventDefault();
    keyboard.tab();
  }
  if (e.code === 'CapsLock') {
    e.preventDefault();
    keyboard.capslock(keyArr, keyArr[29].node);
  }
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

document.addEventListener('keyup', (e) => {
  if (keyCodesArr.includes(e.code)) {
    const key = keyArr.find((item) => item.node.classList.contains(e.code));
    key.node.classList.remove('pressed');
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftKeyUp(keyArr);
  }
});

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
