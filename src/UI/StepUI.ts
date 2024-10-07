import { createButton, createCard, createHeading, createOverlay, createP, walkmeContainer } from '@/UI/components';
import { createElement } from '@/utils/createElement';
import { Walkme } from '@/Walkme';
import { HandleSteps, StepWithDetails } from '@/Walkme/HandleSteps';

export type StepUIProps = {
  walkme: Walkme;
  handleSteps: HandleSteps;
};
export class StepUI {
  walkme: Walkme;
  private card: HTMLDivElement = createCard({ className: 'fixed z-[51]  transition-all duration-300' });
  private title: HTMLHeadingElement = createHeading({ className: 'border-b border-gray-200 dark:border-gray-700 pb-3' });
  private description: HTMLParagraphElement = createP();
  private nextButton: HTMLButtonElement = createButton({ innerText: 'Next', variant: 'secondary', className: 'next-button' });
  private prevButton: HTMLButtonElement = createButton({ innerText: 'Prev', variant: 'primary', className: 'prev-button' });
  private skipButton: HTMLButtonElement = createButton({ innerText: 'Skip', variant: 'tertiary', className: 'skip-button' });
  private padding: number = 8;
  private overlay = createOverlay({ windowPosition: { top: 0, left: 0, width: 0, height: 0 }, padding: this.padding });
  private cardRect: DOMRect = this.card.getBoundingClientRect();
  walkmeContainer: HTMLDivElement = walkmeContainer();
  private handleSteps: HandleSteps;

  constructor({ walkme, handleSteps }: StepUIProps) {
    this.walkme = walkme;
    this.handleSteps = handleSteps;
    this.attachClickEvents();
  }

  private attachClickEvents() {
    this.nextButton.onclick = () => this.handleSteps.next();
    this.prevButton.onclick = () => this.handleSteps.prev();
    this.skipButton.onclick = () => this.handleSteps.skip();
  }

  start() {
    this.walkmeContainer.appendChild(this.overlay.outerDiv);
    document.body.style.overflow = 'hidden';
  }
  stop() {
    this.walkmeContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  private initCardWithMessages(data: StepWithDetails) {
    this.nextButton.disabled = this.handleSteps.isNextButtonDisabled;
    this.prevButton.disabled = this.handleSteps.isPrevButtonDisabled;
    if (this.handleSteps.currentIndex === this.handleSteps.steps.length - 1) {
      this.nextButton.disabled = false;
      this.nextButton.innerText = 'Finish';
      this.nextButton.onclick = () => this.handleSteps.finish();
    } else {
      this.nextButton.innerText = 'Next';
      this.nextButton.onclick = () => this.handleSteps.next();
    }
    this.card.innerHTML = '';
    this.title.innerHTML = data.title;
    this.description.innerHTML = data.description || '';
    this.card.appendChild(this.title);
    this.card.appendChild(this.description);
    const footer = createElement('div', { className: 'flex justify-between gap-2 border-t border-gray-200 dark:border-gray-700 pt-3 items-center' });
    footer.appendChild(this.prevButton);
    footer.appendChild(this.skipButton);
    footer.appendChild(this.nextButton);
    this.card.appendChild(footer);
    const borderRadius = parseInt(getComputedStyle(data.element).borderRadius);
    this.overlay.handleChangeWindowPosition({
      top: data.elementRect.top,
      left: data.elementRect.left,
      width: data.elementRect.width,
      height: data.elementRect.height,
      borderRadius
    });
    this.walkmeContainer.appendChild(this.card);
    this.cardRect = this.card.getBoundingClientRect();
  }

  private placeCardOverTarget(data: StepWithDetails) {
    const rect = data.elementRect;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let newTop = rect.top + rect.height + this.padding;
    let newLeft = rect.left + rect.width * 0.5 - this.cardRect.width * 0.5;

    // Adjust position if the element is at the bottom of the page
    if (rect.bottom + this.cardRect.height > viewportHeight) {
      newTop = rect.top - this.cardRect.height - this.padding;
    }

    // Adjust position if the element is on the right side of the window
    if (newLeft + this.cardRect.width * 0.5 > viewportWidth) {
      newLeft = viewportWidth - this.cardRect.width;
    }

    // Ensure the card is fully visible within the viewport
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newTop < 0) {
      newTop = 0;
    }

    this.card.style.top = `${newTop}px`;
    this.card.style.left = `${newLeft}px`;
  }

  showCurrentStep(data: StepWithDetails) {
    this.initCardWithMessages(data);
    this.placeCardOverTarget(data);
  }
}
