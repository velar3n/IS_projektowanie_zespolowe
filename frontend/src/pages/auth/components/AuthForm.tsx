import { Control } from 'react-hook-form';
import { AuthFormData, AuthMode } from '../types';
import { useTranslation } from 'react-i18next';
import { Stack } from '@chakra-ui/react';
import TextInput from '@/components/input';

const AuthForm = ({
  control,
  mode,
}: {
  control: Control<AuthFormData>;
  mode: AuthMode;
}) => {
  const { t } = useTranslation('auth', { keyPrefix: 'form' });
  return (
    <Stack width="100%">
      {mode === 'register' && (
        <TextInput
          control={control}
          name="name"
          placeholder={t('name.placeholder')}
          label={t('name.label')}
        />
      )}
      <TextInput
        control={control}
        name="email"
        placeholder={t('email.placeholder')}
        label={t('email.label')}
      />
      <TextInput
        control={control}
        name="password"
        label={t('password.label')}
        placeholder={t('password.placeholder')}
        type="password"
      />
    </Stack>
  );
};

export default AuthForm;
