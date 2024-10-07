import { createElement } from '@/utils/createElement';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export const walkmeContainer = () => {
  return createElement(
    'div',
    {
      className: 'walkme-container'
    },
    'body'
  );
};

export const createButton = (props: Partial<HTMLButtonElement> & { variant: ButtonVariant }) => {
  const { className, variant = 'primary', ...rest } = props || {};
  const variant1 = `py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 `;
  const variant2 = `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`;
  const variant3 = `text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`;
  const buttonVariant = {
    primary: variant1,
    secondary: variant2,
    tertiary: variant3
  };

  return createElement('button', {
    className: `${buttonVariant[variant]} ${className} disabled:cursor-auto disabled:pointer-events-none`,
    ...rest
  });
};
export const createHeading = (props?: Partial<HTMLHeadingElement>) => {
  const { className, ...rest } = props || {};
  return createElement('h3', {
    className: `mb-3 text-xl font-medium text-gray-900 dark:text-white ${className}`,
    ...rest
  });
};
export const createP = (props?: Partial<HTMLHeadingElement>) => {
  const { className, ...rest } = props || {};
  return createElement('p', {
    className: `mb-5 text-sm text-gray-500 dark:text-gray-300 ${className}`,
    ...rest
  });
};

export const createCard = (props?: Partial<HTMLDivElement>) => {
  const { className, ...rest } = props || {};
  return createElement('div', {
    className: `max-w-sm w-[24rem] p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`,
    ...rest
  });
};

type OverlayProps = {
  windowPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius?: number;
  };
  padding?: number;
} & Partial<HTMLDivElement>;

export const createOverlay = ({ windowPosition, className, padding = 8, ...rest }: OverlayProps) => {
  const outerDiv = createElement('div', {
    className: `fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 mix-blend-hard-light ${className}`,
    style: { mixBlendMode: 'hard-light' } as unknown as CSSStyleDeclaration,
    ...rest
  });

  const innerWindowDiv = createElement('div', {
    className: `fixed rounded-md bg-[gray] bg-blend-lighten transition-all duration-200`,
    style: {
      backgroundBlendMode: `lighten`
    } as unknown as CSSStyleDeclaration,
    ...rest
  });

  outerDiv.appendChild(innerWindowDiv);

  const handleChangeWindowPosition = (windowPosition: OverlayProps['windowPosition']) => {
    const { top = 0, left = 0, width = 0, height = 0, borderRadius = 6 } = windowPosition || {};
    const topWithPadding = top - padding;
    const leftWithPadding = left - padding;
    const widthWithPadding = width + padding * 2;
    const heightWithPadding = height + padding * 2;

    innerWindowDiv.style.borderRadius = `${Math.max(borderRadius, 6)}px`;
    innerWindowDiv.style.top = `${topWithPadding}px`;
    innerWindowDiv.style.left = `${leftWithPadding}px`;
    innerWindowDiv.style.width = `${widthWithPadding}px`;
    innerWindowDiv.style.height = `${heightWithPadding}px`;
  };

  handleChangeWindowPosition(windowPosition);

  return { outerDiv, innerWindowDiv, handleChangeWindowPosition };
};
