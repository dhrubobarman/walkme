import { Step } from '@/types';
import { StepUI } from '@/UI/StepUI';
import { Walkme } from '@/Walkme';

export type HandleStepsProps = {
  walkme: Walkme;
};

export type StepWithDetails = {
  element: HTMLElement;
  elementRect: DOMRect;
} & Step;

export class HandleSteps {
  steps: Step[];
  currentIndex: number;
  walkme: Walkme;
  currentStep: Step;
  started: boolean;
  isNextButtonDisabled: boolean = false;
  isPrevButtonDisabled: boolean = false;
  found: boolean = false;
  private interval: NodeJS.Timeout | undefined;
  private maxIntervalCount: number = 10;
  currentStepDetails: StepWithDetails | null = null;
  private stepUI: StepUI;
  private resizeObserver: ResizeObserver | null = null;
  private initial: boolean = true;
  private debouncedResize: (...args: unknown[]) => void = this.debounce(() => {
    if (this.initial) {
      this.initial = false;
      return;
    }
    this.showCurrentStep();
  }, 500);

  constructor({ walkme }: HandleStepsProps) {
    this.walkme = walkme;
    this.steps = walkme.stepData.steps;
    this.currentIndex = walkme.currentIndex;
    this.currentStep = this.steps[this.currentIndex];
    this.started = walkme.started;
    this.stepUI = new StepUI({ walkme: this.walkme, handleSteps: this });
  }

  private attachResizeEventListeners() {
    this.resizeObserver = new ResizeObserver((e) => {
      this.debouncedResize();
    });
    this.resizeObserver.observe(document.body);
  }

  async getStepDetails() {
    if (!this.currentStep || !this.currentStep.target) return null;
    const element = <HTMLElement>document.querySelector(this.currentStep.target);
    if (!element) return null;
    try {
      await this.smoothScroll(element);
    } catch (error) {
      const newError = new Error(`Something went wrong while scrolling into the target: ${this.currentStep.target}`);
      this.walkme.onError(newError);
      console.error(error);
    }
    const elementRect = element.getBoundingClientRect();
    this.currentStepDetails = {
      element,
      elementRect,
      ...this.currentStep
    };
    return this.currentStepDetails;
  }

  debounce<T extends (...args: unknown[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  getCurrentStepDetails(): Promise<StepWithDetails> {
    return new Promise((resolve, reject) => {
      if (!this.started) reject('WalkMe has not started yet.');
      if (this.maxIntervalCount <= 0) {
        this.found = false;
        clearInterval(this.interval);
        reject(`Element not found with target: ${this.currentStep.target}`);
      }
      this.interval = setInterval(async () => {
        this.maxIntervalCount--;
        const stepDetails = await this.getStepDetails();
        if (stepDetails) {
          this.maxIntervalCount = 10;
          this.found = true;
          clearInterval(this.interval);
          resolve(stepDetails);
        }
      }, 500);
    });
  }

  smoothScroll(elem: HTMLElement, options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center', inline: 'center' }): Promise<boolean> {
    return new Promise((resolve) => {
      if (!(elem instanceof Element)) {
        throw new TypeError('Argument 1 must be an Element');
      }
      let same = 0; // a counter
      let lastTopPos: number | null = null; // last known Y position
      let lastLeftPos: number | null = null; // last known X position
      // pass the user defined options along with our default
      const scrollOptions = Object.assign({ behavior: 'smooth' }, options);

      // let's begin
      elem.scrollIntoView(scrollOptions);
      requestAnimationFrame(check);

      // this function will be called every painting frame
      // for the duration of the smooth scroll operation
      function check() {
        // check our current position
        const { top: newTopPos, left: newLeftPos } = elem.getBoundingClientRect();

        if (newTopPos === lastTopPos && newLeftPos === lastLeftPos) {
          // same as previous
          if (same++ > 2) {
            return resolve(true); // we've come to an halt
          }
        } else {
          same = 0; // reset our counter
          lastLeftPos = newLeftPos;
          lastTopPos = newTopPos; // remember our current position
        }
        // check again next painting frame
        requestAnimationFrame(check);
      }
    });
  }

  disableButtons() {
    if (this.currentIndex === this.steps.length - 1) {
      this.isNextButtonDisabled = true;
      return;
    } else {
      this.isNextButtonDisabled = false;
    }
    if (this.currentIndex === 0) {
      this.isPrevButtonDisabled = true;
      return;
    } else {
      this.isPrevButtonDisabled = false;
    }
  }

  async showCurrentStep() {
    try {
      const data = await this.getCurrentStepDetails();
      this.stepUI.showCurrentStep(data);
    } catch (error) {
      const newError = error as Error;
      this.walkme.onError(newError);
    }
  }

  async next() {
    this.currentIndex++;
    this.disableButtons();
    this.currentStep = this.steps[this.currentIndex];
    this.showCurrentStep();
  }

  async prev() {
    this.currentIndex--;
    this.disableButtons();
    this.currentStep = this.steps[this.currentIndex];
    this.showCurrentStep();
  }

  async start() {
    this.disableButtons();
    if (!this.walkme.started) return;
    this.started = true;
    this.stepUI.start();
    this.showCurrentStep();
    this.attachResizeEventListeners();
  }

  stop() {
    this.resizeObserver?.disconnect();
    this.stepUI.stop();
  }
  finish() {
    this.resizeObserver?.disconnect();
    this.stepUI.stop();
    this.walkme.finish();
  }
  skip() {
    this.resizeObserver?.disconnect();
    this.walkme.skip();
  }
}
