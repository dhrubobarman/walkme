import { createButton } from '@/UI/components';
import { Walkme } from '@/Walkme';
import { testData } from '@/tempData';
import './style.scss';
export * from '@/Walkme';

const button = createButton({ variant: 'primary', innerHTML: 'Start', className: 'absolute left-0 top-0' });
document.body.appendChild(button);

const walkme = new Walkme({ stepData: testData[0] });
button.onclick = () => walkme.start();
