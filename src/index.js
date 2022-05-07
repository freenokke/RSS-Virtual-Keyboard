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
