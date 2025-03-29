import { Controller, FieldValues } from 'react-hook-form';
import { Input, Field } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { FieldProps } from './types';

type InputProps<T extends FieldValues> = {
  helperText?: string;
  type?: HTMLInputTypeAttribute;
} & FieldProps<T>;

const TextInput = <T extends FieldValues>({
  name,
  rules,
  label,
  placeholder,
  helperText,
  control,
  type = 'text',
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Field.Root invalid={!!error}>
            <Field.Label>{label}</Field.Label>
            <Input {...field} placeholder={placeholder} type={type} px={2} />
            <Field.HelperText>{helperText}</Field.HelperText>
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};

export default TextInput;
