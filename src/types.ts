export type StepData = {
  _id: string;
  title: string;
  url: string;
  learned: boolean;
  description?: string;
  steps: Step[];
};

export type Step = {
  title: string;
  description?: string;
  target?: string;
  _id: string;
};
