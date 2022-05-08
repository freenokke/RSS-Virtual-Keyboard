import './assets/sass/style.sass';
import enCode from './keyboardData/en';
import Main from './layoutFlow/template';
import Keyboard from './layoutFlow/keyboard';
import Key from './layoutFlow/key';

const textArea = new Main(document.body, 'textarea', 'keyboard-textarea'); // (parent, tag, class)
textArea.create();

const keyboardWrapper = new Main(document.body, 'div', 'keyboard-container'); // (parent, tag, class)
keyboardWrapper.create();

const keyboard = new Keyboard(keyboardWrapper.node, 'div', 'keyboard', textArea.node, 'en'); // (parent, tag, class, textarea, language)
keyboard.create();

const keyArr = enCode.map((item) => {
  const classes = ['key', item.code];
  const key = new Key(keyboard.node, classes, item.key, keyboard, item.modeKey);
  // parent, class, content, keyboard, isMode, tagName = 'button'
  return key;
});


function shiftKeyMouseClick(keys) {
  if (keyboard.isShiftKey) {
    keyboard.isShiftKey = false;
    keys.forEach((item, index) => {
      item.setContent(enCode[index].key);
    });
  } else {
    keys.forEach((item, index) => {
      item.setContent(enCode[index].shift);
    });
    keyboard.isShiftKey = true;
  }
}

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
  if (e.target.innerText === 'Tab') {
    keyboard.tab();
  }
  if (e.target.innerText === 'Delete') {
    keyboard.delete();
  }
  if (e.target.innerText === 'CapsLock') {
    keyboard.capslock(keyArr, e.target);
  }
});

window.addEventListener('DOMContentLoaded', renderKeys(keyArr));
