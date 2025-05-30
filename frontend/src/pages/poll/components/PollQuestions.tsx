import { PollQuestionData } from '@/api/poll/types';
import { Stack } from '@chakra-ui/react';
import SingleQuestion from './SingleQuestion';
import { Control, useFieldArray } from 'react-hook-form';
import { PollSubmissionFormData } from '../types';

type PollQuestionsPrps = {
  questions: Array<PollQuestionData>;
  control: Control<PollSubmissionFormData>;
  disabled?: boolean;
};

const PollQuestions = ({
  questions,
  control,
  disabled = false,
}: PollQuestionsPrps) => {
  const { fields } = useFieldArray({ control, name: 'anwers' });
  return (
    <Stack>
      {fields.map((field, index) => {
        const matchingQuestion = questions.find(
          (question) => question.id === field.questionId,
        );
        if (!matchingQuestion) return null;
        return (
          <SingleQuestion
            key={field.id}
            index={index}
            control={control}
            {...matchingQuestion}
          />
        );
      })}
    </Stack>
  );
};

export default PollQuestions;
