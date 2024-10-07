# Typescript WalkMe library

WalkMe is a library designed to guide users through a website step-by-step. It takes `WalkmeProps` as input and provides an interactive walkthrough experience.

## Getting Started

To start using WalkMe, ensure you have `pnpm` and Node.js version 20 or above installed.

### Installation

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/walkme.git
cd walkme
```

Install the dependencies using `pnpm`:

```bash
pnpm install
```

# Production Build

To use WalkMe in a production environment, build the project using `pnpm`. This will create both CommonJS (CJS) and ECMAScript Module (ESM) builds, along with type definitions. You can choose the appropriate build based on your needs and include the generated CSS file.

```bash
pnpm build
```

### Scripts

Here are the available scripts in the `package.json`:

- **Development**: Start the development server.
  ```bash
  pnpm dev
  ```
- **Build**: Build the project using `tsup`.
  ```bash
  pnpm build
  ```
- **Lint**: Lint the codebase using `eslint`.
  ```bash
  pnpm lint
  ```
- **Format**: Format the codebase using `prettier`.
  ```bash
  pnpm format
  ```
- **Prepare**: Prepare the project for Husky.
  ```bash
  pnpm prepare
  ```
- **Fix**: Automatically fix linting issues.
  ```bash
  pnpm fix
  ```

## Usage

To use the WalkMe class, you need to provide the `WalkmeProps`.

### WalkmeProps

```typescript
type StepData = {
  _id: string;
  title: string;
  url: string;
  learned: boolean;
  description?: string;
  steps: Step[];
};

type Step = {
  title: string;
  description?: string;
  target?: string;
  _id: string;
};

type WalkmeProps = {
  stepData: StepData;
  onFinish?: (step: StepData) => void;
  onError?: (error: Error) => void;
  onSkip?: (stepData: StepData) => void;
};
```

### Example

Here's an example of how to use the WalkMe class:

```typescript
import WalkMe from 'walkme';

const stepData = {
  _id: '1',
  title: 'Welcome Tour',
  url: '/home',
  learned: false,
  steps: [
    {
      _id: '1-1',
      title: 'Step 1',
      description: 'This is the first step.',
      target: '#step1'
    },
    {
      _id: '1-2',
      title: 'Step 2',
      description: 'This is the second step.',
      target: '#step2'
    }
  ]
};

const walkmeProps = {
  stepData,
  onFinish: (stepData) => {
    console.log('Tour finished:', stepData);
  },
  onError: (error) => {
    console.error('Error during tour:', error);
  },
  onSkip: (stepData) => {
    console.log('Tour skipped:', stepData);
  }
};

const walkMeInstance = new WalkMe(walkmeProps);
walkMeInstance.start();
```

![image](https://github.com/user-attachments/assets/0cf7e563-ece1-4731-a56d-fdd415bd440b)
![image](https://github.com/user-attachments/assets/2fb053fd-1e72-4a00-b6b5-36c22e0ff161)
