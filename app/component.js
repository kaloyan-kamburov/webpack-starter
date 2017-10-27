import styles from './test.css';
import './test.less';

export default (text = 'Hello World!') => {
  const element = document.createElement('div');
  element.id = 'div1';
  element.className = styles.eva;

  let x = 'ASD';

  element.innerHTML = text + x;

  const el = document.createElement('div');
  el.id = 'div2';
  el.innerHTML = 'TEST';
  el.className = styles.test;
  element.appendChild(el);
  const anchor = document.createElement('a');
  anchor.href = './sidebar.html';
  anchor.innerHTML = 'CLICK';
  element.appendChild(anchor);
  return element;
};
