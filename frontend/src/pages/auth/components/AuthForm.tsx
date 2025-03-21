import { Input } from '@app/ui/components';
import { FieldsList } from './shared';
import { Control } from 'react-hook-form';
import { AuthFormData, AuthMode } from '../types';
import { useTranslation } from 'react-i18next';

const AuthForm = ({
  control,
  mode,
}: {
  control: Control<AuthFormData>;
  mode: AuthMode;
}) => {
  const { t } = useTranslation('auth', { keyPrefix: 'form' });
  return (
    <FieldsList>
      {mode === 'register' && (
        <Input
          control={control}
          name="name"
          placeholder={t('name.placeholder')}
          label={t('name.label')}
        />
      )}
      <Input
        control={control}
        name="email"
        placeholder={t('email.placeholder')}
        label={t('email.label')}
      />
      <Input
        control={control}
        name="password"
        label={t('password.label')}
        placeholder={t('password.placeholder')}
        type="password"
      />
    </FieldsList>
  );
};

export default AuthForm;
