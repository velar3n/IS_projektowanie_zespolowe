import { Control } from 'react-hook-form';
import { ChangePasswordFormData } from '../types';
import { useTranslation } from 'react-i18next';
import { Stack } from '@chakra-ui/react';
import TextInput from '@/components/input';

const ChangePasswordForm = ({
  control,
}: {
  control: Control<ChangePasswordFormData>;
}) => {
  const { t } = useTranslation('profile', { keyPrefix: 'changePassword.form' });
  const { t: tValidation } = useTranslation('common', {
    keyPrefix: 'validation',
  });

  return (
    <Stack width="100%" gap={4}>
      <TextInput
        control={control}
        name="currentPassword"
        type="password"
        placeholder={t('currentPassword.placeholder')}
        label={t('currentPassword.label')}
        rules={{
          required: tValidation('required', {
            name: t('currentPassword.label'),
          }),
        }}
      />
      <TextInput
        control={control}
        name="newPassword"
        type="password"
        placeholder={t('newPassword.placeholder')}
        label={t('newPassword.label')}
        rules={{
          required: tValidation('required', { name: t('newPassword.label') }),
          minLength: {
            value: 6,
            message: tValidation('minCharacters', {
              name: t('newPassword.label'),
              number: 6,
            }),
          },
        }}
      />
      <TextInput
        control={control}
        name="confirmPassword"
        type="password"
        placeholder={t('confirmPassword.placeholder')}
        label={t('confirmPassword.label')}
        rules={{
          required: tValidation('required', {
            name: t('confirmPassword.label'),
          }),
          validate: (value, formValues) => {
            if (value !== formValues.newPassword) {
              return t('confirmPassword.error');
            }
            return true;
          },
        }}
      />
    </Stack>
  );
};

export default ChangePasswordForm;
