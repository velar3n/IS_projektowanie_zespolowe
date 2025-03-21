import { Input } from '@app/ui/components';
import { FieldsList } from './shared';
import { Control } from 'react-hook-form';
import { AuthFormData } from '../types';

const LoginForm = ({ control }: { control: Control<AuthFormData> }) => {
  return (
    <FieldsList>
      <Input control={control} name="email" />
      <Input control={control} name="password" />
    </FieldsList>
  );
};

export default LoginForm;
