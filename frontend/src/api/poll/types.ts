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

export type UserSubmission = {
  answers: Array<{
    id: number;
    question: {
      id: number;
    };
    selectedOptions: Array<SingleOptionData>;
  }>;
  id: number;
  createdBy: string;
  survey: Omit<PollResponse, 'questions'>;
};

export type UserSubmissionsResult = Array<UserSubmission>;

export type SingleResult = {
  id: number;
  text: string;
  count: number;
};

export type PollResultsResponse = {
  survey: Omit<PollResponse, 'questions'>;
  questions: Array<{
    id: number;
    text: string;
    results: Array<SingleResult>;
  }>;
};

export type PollType = 'MULTIPLE-CHOICE' | 'SINGLE-CHOICE';

export type CreatePollRequest = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  questions: Array<{
    text: string;
    type: PollType;
    options: string[];
  }>;
};

export type PollsListingResponse = Array<{
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string | null;
  public: boolean;
}>;
