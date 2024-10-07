import { StepData } from '@/types';
import { HandleSteps } from '@/Walkme/HandleSteps';

export type WalkmeProps = {
  stepData: StepData;
  onFinish?: (step: StepData) => void;
  onError?: (error: Error) => void;
  onSkip?: (stepData: StepData) => void;
};

export class Walkme {
  stepData!: StepData;
  isReady: boolean = false;
  currentIndex: number = 0;
  onError: (error: Error) => void;
  onFinish: ((step: StepData) => void) | undefined;
  onSkip: ((stepData: StepData) => void) | undefined;
  started: boolean = false;
  handleSteps: HandleSteps;

  constructor({ stepData, onError = (error: Error) => console.error(error), onFinish, onSkip }: WalkmeProps) {
    this.stepData = stepData;
    this.onError = onError;
    this.onFinish = onFinish;
    this.onSkip = onSkip;
    this.isReady = true;
    this.handleSteps = new HandleSteps({ walkme: this });
  }
  start() {
    this.started = true;
    this.handleSteps.start();
  }
  stop() {
    this.handleSteps.stop();
    this.started = false;
    this.currentIndex = 0;
    this.handleSteps = new HandleSteps({ walkme: this });
  }
  skip() {
    if (this.onSkip) this.onSkip(this.stepData);
    this.stop();
  }
  finish() {
    this.stepData.learned = true;
    if (this.onFinish) this.onFinish(this.stepData);
    this.stop();
  }
}
