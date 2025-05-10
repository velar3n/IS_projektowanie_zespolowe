import TextInput from '@/components/input';
import { Field, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import {
  Control,
  FieldPathByValue,
  useFieldArray,
  useFormState,
} from 'react-hook-form';
import { PollFormData, PollQuestion } from '../types';
import ControlledSwitch from '@/components/input/ControlledSwitch';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import SurveyOption from './SurveyOption';
import AddElementButton from './AddElementButton';

type SurveyQuestionProps = {
  index: number;
  control: Control<PollFormData>;
  name: FieldPathByValue<PollFormData, PollQuestion>;
  onDelete: () => void;
};

const SurveyQuestion = ({
  control,
  name,
  index,
  onDelete,
}: SurveyQuestionProps) => {
  const { t: tValidation } = useTranslation('common', {
    keyPrefix: 'validation',
  });
  const { t } = useTranslation('polls', {
    keyPrefix: 'form.questions.question',
  });

  const { errors } = useFormState({ control, name });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.options`,
    rules: {
      required: t('minAmountError'),
      minLength: {
        value: 1,
        message: t('minAmountError'),
      },
    },
  });

  const optionsError = errors?.questions?.[index]?.options;

  return (
    <Stack
      gap="12px"
      border="1px dotted"
      borderColor="black"
      p="12px"
      borderRadius="lg"
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold">{t('title', { number: index + 1 })}</Text>
        <ConfirmationModal
          action={onDelete}
          destructive
          trigger={
            <IconButton colorPalette="red">
              <MdDelete />
            </IconButton>
          }
        />
      </HStack>
      <Stack>
        <TextInput
          control={control}
          name={`${name}.questionText`}
          placeholder={t('input.placeholder')}
          label={t('input.label')}
          rules={{
            required: tValidation('required', { name: 'Question title' }),
          }}
        />
        <ControlledSwitch
          control={control}
          name={`${name}.isMulti`}
          label={t('switches.isMulti')}
        />
        <ControlledSwitch
          control={control}
          name={`${name}.isRequired`}
          label={t('switches.isRequired')}
        />
      </Stack>
      <Text>{t('options.title')}</Text>
      <Field.Root invalid={!!optionsError?.root}>
        <Stack w="100%">
          {fields.map((field, index) => (
            <SurveyOption
              key={field.id}
              control={control}
              name={`${name}.options.${index}.text`}
              onDelete={() => remove(index)}
            />
          ))}
          <AddElementButton
            title={t('options.addButtonLabel')}
            variant="surface"
            size="small"
            isError={!!optionsError?.root}
            onClick={() => append({ text: '' })}
          />
        </Stack>
        <Field.ErrorText>{optionsError?.root?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
};

export default SurveyQuestion;
