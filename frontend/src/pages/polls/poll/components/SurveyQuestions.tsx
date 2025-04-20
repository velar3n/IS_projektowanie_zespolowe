import { Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PollFormData } from '../types';
import { Control, useFieldArray } from 'react-hook-form';
import AddElementButton from './AddElementButton';
import SurveyQuestion from './SurveyQuestion';

type SurveyQuestionsProps = {
  control: Control<PollFormData>;
};

const SurveyQuestions = ({ control }: SurveyQuestionsProps) => {
  const { t } = useTranslation('polls', { keyPrefix: 'form.questions' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });
  return (
    <Stack>
      <Text fontSize="2xl" mb="24px">
        {t('section')}
      </Text>
      {fields.map((field, index) => (
        <SurveyQuestion
          index={index}
          name={`questions.${index}`}
          control={control}
          key={field.id}
          onDelete={() => remove(index)}
        />
      ))}
      <AddElementButton
        variant="outline"
        title={t('question.addButtonLabel')}
        onClick={() => {
          append({
            questionText: '',
            isMulti: false,
            isRequired: true,
            options: [],
          });
        }}
      />
    </Stack>
  );
};

export default SurveyQuestions;
