import { Field, Switch } from '@chakra-ui/react';
import { FieldProps } from './types';
import { Controller, FieldPathByValue, FieldValues } from 'react-hook-form';

type ControlledSwitchProps<T extends FieldValues> = Omit<
  FieldProps<T>,
  'rules' | 'placeholder' | 'name'
> & { name: FieldPathByValue<T, boolean> };

const ControlledSwitch = <T extends FieldValues>({
  name,
  control,
  label,
}: ControlledSwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <Field.Root>
          <Switch.Root
            checked={Boolean(value)}
            onCheckedChange={({ checked }) => {
              onChange(checked);
            }}
          >
            <Switch.HiddenInput onBlur={onBlur} />
            <Switch.Control />
            <Switch.Label>{label}</Switch.Label>
          </Switch.Root>
        </Field.Root>
      )}
    />
  );
};

export default ControlledSwitch;
