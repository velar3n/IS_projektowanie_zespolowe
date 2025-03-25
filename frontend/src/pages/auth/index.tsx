import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthFormData, AuthMode } from './types';
import { useState } from 'react';
import { useLogin } from '@/api/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import PollIcon from '@/components/icons/Poll';
import AuthForm from './components/AuthForm';

const AuthScreen = () => {
  const { t } = useTranslation('auth');
  const { mutateAsync: login, isPending: isLoginLoading } = useLogin();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<AuthFormData>();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // TODO proper handling
  const handleAuth = async (data: AuthFormData) => {
    navigate('/');
    const { email, password } = data;
    const loginData = await login({ login: email, password });

    // eslint-disable-next-line no-console
    console.log(loginData);
  };

  return (
    <Box
      bgGradient="linear-gradient(90deg, #6949fd 0%, #b4e5fb 100%)"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        bgColor="white"
        width="30vw"
        boxShadow="lg"
        justifyContent="center"
        alignItems="center"
        borderRadius="xl"
        gap={8}
        p={4}
      >
        <Stack alignItems="center">
          <PollIcon width={28} height={28} />
          <Text fontSize="3xl">{t('title')}</Text>
        </Stack>

        <Stack width="80%">
          <AuthForm control={control} mode={authMode} />

          <HStack alignItems="center" justifyContent="left" width="100%">
            <Text color="gray.600" fontSize="sm">
              {t(`${authMode}.text`)}
            </Text>
            <Button
              variant="plain"
              onClick={() =>
                setAuthMode(authMode === 'login' ? 'register' : 'login')
              }
            >
              <Text color="gray.600" fontSize="sm">
                {t(`${authMode}.button`)}
              </Text>
            </Button>
          </HStack>
        </Stack>

        <Button
          colorPalette="purple"
          px={32}
          borderRadius="xl"
          loading={isLoginLoading}
          onClick={handleSubmit(handleAuth)}
        >
          {t(`button.${authMode}`)}
        </Button>
      </Stack>
    </Box>
  );
};

export default AuthScreen;
