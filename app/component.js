import styles from './test.css';
import './test.less';

export default (text = 'Hello World!') => {
  const element = document.createElement('div');
  element.id = 'div1';
  element.className = styles.eva;

  element.innerHTML = text;

  const el = document.createElement('div');
  el.id = 'div2';
  el.innerHTML = 'TEST';
  el.className = styles.test;
  element.appendChild(el);

  return element;
};
