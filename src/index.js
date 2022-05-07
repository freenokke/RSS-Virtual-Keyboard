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
    shiftKeyMouseClick(keyArr);
  }
  if (e.target.innerText === 'Backspace') {
    const textLength = textArea.node.value.length;
    if (textArea.node.selectionStart !== textArea.node.selectionEnd) {
      const beforeSelect = textArea.node.value.substr(0, textArea.node.selectionStart);
      const afterSelect = textArea.node.value.substr(textArea.node.selectionEnd, textLength);
      textArea.node.value = beforeSelect + afterSelect;
    } else {
      textArea.node.value = textArea.node.value.substr(0, textLength - 1);
    }
  }
  if (e.target.innerText === 'Enter') {
    textArea.node.value += '\n';
    textArea.node.focus();
  }
});

window.addEventListener('DOMContentLoaded', renderKeys(keyArr));
