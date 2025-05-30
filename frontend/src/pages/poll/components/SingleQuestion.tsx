import { PollQuestionData } from '@/api/poll/types';
import { Checkbox, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { Control, useController, useFieldArray } from 'react-hook-form';
import { PollSubmissionFormData } from '../types';
import { Fragment } from 'react/jsx-runtime';
import { CheckedChangeDetails } from 'node_modules/@chakra-ui/react/dist/types/components/checkbox/namespace';

type SingleQuestionProps = {
  disabled?: boolean;
  control: Control<PollSubmissionFormData>;
  index: number;
} & PollQuestionData;

const SingleQuestion = ({
  text,
  type,
  options,
  disabled = false,
  control,
  index,
}: SingleQuestionProps) => {
  const isSingleChoice = type === 'SINGLE-CHOICE';

  const { fields, update } = useFieldArray({
    control,
    name: `anwers.${index}.selected`,
    rules: {
      validate: {
        answerGiven: (values) => {
          return (
            values.some((item) => item.selected) ||
            'You have to select an answer'
          );
        },
      },
    },
  });

  const {
    fieldState: { error },
  } = useController({
    control,
    name: `anwers.${index}.selected`,
  });

  const Wrapper = isSingleChoice ? RadioGroup.Root : Fragment;

  const handleRadio = (value: string) => {
    options.forEach((option, index) => {
      const numId = parseInt(value);
      update(index, { optionId: option.id, selected: numId === option.id });
    });
  };

  return (
    <Stack>
      <Text fontSize="lg">{`${index + 1}. ${text}`}</Text>
      <Stack>
        <Wrapper
          {...(isSingleChoice
            ? {
                onValueChange: (e) => !disabled && handleRadio(e.value ?? ''),
              }
            : {})}
        >
          {fields.map((field, index) => {
            const matchingOption = options.find(
              (option) => option.id === field.optionId,
            );
            if (!matchingOption) return null;
            return (
              <Stack key={index} pb="5px">
                {isSingleChoice ? (
                  <RadioField
                    text={matchingOption.text}
                    id={matchingOption.id.toString()}
                  />
                ) : (
                  <CheckboxField
                    text={matchingOption.text}
                    checked={field.selected}
                    onChecked={(e) =>
                      !disabled &&
                      update(index, {
                        optionId: matchingOption.id,
                        selected: !!e.checked,
                      })
                    }
                  />
                )}
              </Stack>
            );
          })}
        </Wrapper>
      </Stack>
      {error && (
        <Text color="red" fontSize="sm">
          {error.root?.message}
        </Text>
      )}
    </Stack>
  );
};

type FieldProps = {
  checked: boolean;
  text: string;
  onChecked: (e: CheckedChangeDetails) => void;
};

const RadioField = ({ text, id }: { text: string; id: string }) => {
  return (
    <RadioGroup.Item value={id}>
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>{text}</RadioGroup.ItemText>
    </RadioGroup.Item>
  );
};

const CheckboxField = ({ checked, onChecked, text }: FieldProps) => {
  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => onChecked(e)}>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>{text}</Checkbox.Label>
    </Checkbox.Root>
  );
};

export default SingleQuestion;
