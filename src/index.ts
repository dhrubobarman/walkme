import './style.scss';
import { createElement } from '@/utils/createElement';

const div = createElement('div', {
  className: 'test underline',
  innerHTML: 'HI'
});

console.log(div);
