type SingleQuestionField = {
  questionId: number;
  selected: Array<{ optionId: number; selected: boolean }>;
};

export type PollSubmissionFormData = {
  anwers: Array<SingleQuestionField>;
};

export type PollMode = 'preview' | 'form';
