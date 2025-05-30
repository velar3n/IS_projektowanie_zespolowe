export type PollQuestionType = 'MULTIPLE-CHOICE' | 'SINGLE-CHOICE';

export type SingleOptionData = {
  id: number;
  text: string;
};

export type PollQuestionData = {
  id: number;
  text: string;
  type: PollQuestionType;
  options: Array<SingleOptionData>;
};

export type PollResponse = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions: Array<PollQuestionData>;
};

export type SingleAnswer = {
  questionId: string;
  selectedIds: string[];
};

export type FilledPollRequest = Array<SingleAnswer>;
