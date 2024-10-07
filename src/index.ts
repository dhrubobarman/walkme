import { testData } from '@/tempData';
import './style.scss';
import { Walkme } from '@/Walkme';
import { createElement } from '@/utils/createElement';
export * from '@/Walkme';

const button = createElement('button', { innerText: 'Start', className: 'start-button text-white fixed top-0 left-0 p-3 bg-gray-500' }, 'body');

const walkme = new Walkme({ stepData: testData[0] });
button.onclick = () => walkme.start();
