import { Controller, FieldValues } from 'react-hook-form';
import { Input, Field, Textarea } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { FieldProps } from './types';

type InputProps<T extends FieldValues> = {
  helperText?: string;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  rows?: number;
} & FieldProps<T>;

const TextInput = <T extends FieldValues>({
  name,
  rules,
  label,
  placeholder,
  helperText,
  control,
  type = 'text',
  multiline = false,
  rows,
}: InputProps<T>) => {
  const InputComponent = multiline ? Textarea : Input;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Field.Root invalid={!!error}>
            <Field.Label>{label}</Field.Label>
            <InputComponent
              {...field}
              placeholder={placeholder}
              type={type}
              px={2}
              rows={rows}
            />
            <Field.HelperText>{helperText}</Field.HelperText>
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};

export default TextInput;
