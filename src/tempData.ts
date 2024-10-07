import { StepData } from '@/types';

export const testData: StepData[] = [
  {
    _id: '1728279027342',
    title: 'Test Flow',
    learned: false,
    steps: [
      {
        title: 'Step 1',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-2',
        _id: '1728279044178'
      },
      {
        title: 'Step 2',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-4',
        _id: '1728279050249'
      },
      {
        title: 'Step 3',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-8',
        _id: '1728279069871'
      },
      {
        title: 'Step 4',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-10',
        _id: '1728279077753'
      },
      {
        title: 'Step 5',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-14',
        _id: '1728279087574'
      },
      {
        title: 'Step 6',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-12',
        _id: '1728279094442'
      },
      {
        title: 'Step 7',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
        target: '#card-18',
        _id: '1728279101909'
      },
      {
        title: 'Step 8',
        description: 'Lorem',
        target: '#card-28',
        _id: '1728290229046'
      }
    ],
    url: 'http://localhost:5174/',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual'
  },
  {
    url: 'http://localhost:5173/',
    _id: '1728032439164',
    title: 'Test Flow 2',
    learned: false,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi repudiandae expedita soluta iste quas consectetur.',
    steps: [
      {
        title: 'Step 1',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi repudiandae expedita soluta iste quas consectetur.',
        target: '#card-title-4',
        _id: '1728032460608'
      },
      {
        title: 'Step 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi repudiandae expedita soluta iste quas consectetur.',
        target: '#card-title-8',
        _id: '1728032468015'
      },
      {
        title: 'Step 3',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi repudiandae expedita soluta iste quas consectetur.',
        target: '#card-title-18',
        _id: '1728032476684'
      },
      {
        title: 'Renamed content 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni sed pariatur natus ex error praesentium.',
        target: '#card-p-16',
        _id: '1728042168077'
      }
    ]
  },
  {
    url: 'http://localhost:5173/',
    _id: '1728042853160',
    title: 'Test Flow 3',
    learned: false,
    description: 'Test description\n',
    steps: [
      {
        title: 'Test 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni sed pariatur natus ex error praesentium.',
        target: '#card-p-4',
        _id: '1728042878928'
      },
      {
        title: 'Test 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni sed pariatur natus ex error praesentium.',
        target: '#card-4',
        _id: '1728042889238'
      }
    ]
  }
] as const;
