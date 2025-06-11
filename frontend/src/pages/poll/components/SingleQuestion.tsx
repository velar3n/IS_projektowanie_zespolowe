import { PollQuestionData } from '@/api/poll/types';
import { Checkbox, Stack, Text } from '@chakra-ui/react';
import { Control, useController, useFieldArray } from 'react-hook-form';
import { PollSubmissionFormData } from '../types';
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

  return (
    <Stack>
      <Text fontSize="lg">{`${index + 1}. ${text}`}</Text>
      <Stack>
        {fields.map((field, index) => {
          const matchingOption = options.find(
            (option) => option.id === field.optionId,
          );
          if (!matchingOption) return null;
          return (
            <Stack key={index} pb="5px">
              {isSingleChoice ? (
                <RadioField
                  checked={field.selected}
                  text={matchingOption.text}
                  disabled={disabled}
                  onChange={() => {
                    if (disabled) return;
                    for (const [index, value] of fields.entries()) {
                      update(index, {
                        optionId: value.optionId,
                        selected: value.optionId === matchingOption.id,
                      });
                    }
                  }}
                />
              ) : (
                <CheckboxField
                  disabled={disabled}
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
  disabled?: boolean;
  text: string;
  onChecked: (e: CheckedChangeDetails) => void;
};

const RadioField = ({
  text,
  checked,
  disabled,
  onChange,
}: {
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span>{text}</span>
    </label>
  );
};

const CheckboxField = ({ checked, disabled, onChecked, text }: FieldProps) => {
  return (
    <Checkbox.Root
      disabled={disabled}
      checked={checked}
      onCheckedChange={(e) => onChecked(e)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>{text}</Checkbox.Label>
    </Checkbox.Root>
  );
};

export default SingleQuestion;
