import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChangePasswordFormData } from './types';
import { useChangePassword } from '@/api/user/hooks';
import { useUserStore } from '@/stores/user';
import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Text,
  Separator,
} from '@chakra-ui/react';
import ChangePasswordForm from './components/ChangePasswordForm';
import { toaster } from '@/components/ui/toaster';
import axios from 'axios';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { control, handleSubmit, reset, setError } =
    useForm<ChangePasswordFormData>();
  const user = useUserStore((state) => state.user);

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword({
      onSuccess: () => {
        toaster.success({
          title: t('changePassword.success.title'),
          description: t('changePassword.success.description'),
        });
        reset();
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setError('currentPassword', {
            message: t('changePassword.errors.incorrectPassword'),
          });
        } else {
          toaster.error({
            title: t('changePassword.errors.title'),
            description: t('changePassword.errors.description'),
          });
        }
      },
    });

  const handleChangePassword = (data: ChangePasswordFormData) => {
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  if (!user) {
    return (
      <Box p={8}>
        <Box
          bg="red.50"
          p={4}
          borderRadius="md"
          border="1px solid"
          borderColor="red.200"
        >
          <Text color="red.600">{t('errors.userNotFound')}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Stack gap={8}>
        <Heading size="xl">{t('title')}</Heading>

        {/* User Information Section */}
        <Card.Root>
          <Card.Header>
            <Heading size="lg">{t('userInfo.title')}</Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              <Box>
                <Text fontWeight="bold" color="gray.600">
                  {t('userInfo.username')}:
                </Text>
                <Text fontSize="lg">{user.username}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="gray.600">
                  {t('userInfo.email')}:
                </Text>
                <Text fontSize="lg">{user.email}</Text>
              </Box>
            </Stack>
          </Card.Body>
        </Card.Root>

        <Separator />

        {/* Change Password Section */}
        <Card.Root>
          <Card.Header>
            <Heading size="lg">{t('changePassword.title')}</Heading>
            <Text color="gray.600">{t('changePassword.description')}</Text>
          </Card.Header>
          <Card.Body>
            <Stack gap={6}>
              <ChangePasswordForm control={control} />
              <Button
                colorPalette="purple"
                onClick={handleSubmit(handleChangePassword)}
                loading={isChangingPassword}
                alignSelf="flex-start"
              >
                {t('changePassword.button')}
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
