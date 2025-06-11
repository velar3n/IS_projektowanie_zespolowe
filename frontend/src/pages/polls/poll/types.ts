export type PollOption = {
  text: string;
};

export type PollQuestion = {
  questionText: string;
  isMulti: boolean;
  options: Array<PollOption>;
};

export type PollFormData = {
  title: string;
  description: string;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  questions: Array<PollQuestion>;
};
