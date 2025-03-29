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
  const { t: tValidation } = useTranslation('common', {
    keyPrefix: 'validation',
  });
  return (
    <Stack width="100%">
      {mode === 'register' && (
        <TextInput
          control={control}
          name="email"
          placeholder={t('email.placeholder')}
          label={t('email.label')}
          rules={{
            required: tValidation('fieldRequired', { name: 'Full name' }),
          }}
        />
      )}
      <TextInput
        control={control}
        name="username"
        placeholder={t('username.placeholder')}
        label={t('username.label')}
        rules={{
          required: tValidation('fieldRequired', { name: 'Email' }),
        }}
      />
      <TextInput
        control={control}
        name="password"
        label={t('password.label')}
        placeholder={t('password.placeholder')}
        rules={{
          required: tValidation('fieldRequired', { name: 'Password' }),
        }}
        type="password"
      />
    </Stack>
  );
};

export default AuthForm;
