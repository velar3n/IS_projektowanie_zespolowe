import { Stack, Text, Field } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PollFormData } from '../types';
import { Control, useFieldArray, useFormState } from 'react-hook-form';
import AddElementButton from './AddElementButton';
import SurveyQuestion from './SurveyQuestion';

type SurveyQuestionsProps = {
  control: Control<PollFormData>;
};

const SurveyQuestions = ({ control }: SurveyQuestionsProps) => {
  const { t } = useTranslation('polls', { keyPrefix: 'form.questions' });
  const { errors } = useFormState({ control, name: 'questions' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: {
      required: t('minAmountError'),
      minLength: {
        value: 1,
        message: t('minAmountError'),
      },
    },
  });

  return (
    <Field.Root invalid={!!errors.questions?.root}>
      <Stack w="100%">
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
          isError={!!errors.questions?.root}
          title={t('question.addButtonLabel')}
          onClick={() => {
            append({
              questionText: '',
              isMulti: false,
              options: [],
            });
          }}
        />
      </Stack>
      <Field.ErrorText>{errors.questions?.root?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default SurveyQuestions;
