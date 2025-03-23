import { Icon, Text } from '@app/ui/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AuthFormData, AuthMode } from './types';
import { useState } from 'react';
import AuthForm from './components/AuthForm';
import Button from '@app/ui/components/button';
import { useLogin } from '@app/api/auth/hooks';
import { useNavigate } from 'react-router-dom';

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
    <AuthContainer>
      <Wrapper>
        <Header>
          <StyledPollIcon />
          <Text.H1>{t('title')}</Text.H1>
        </Header>

        <AuthForm control={control} mode={authMode} />
        <TextRow>
          <StyledText>{t(`${authMode}.text`)}</StyledText>
          <ChangeAuthModeButton
            title={t(`${authMode}.button`)}
            onClick={() =>
              setAuthMode(authMode === 'login' ? 'register' : 'login')
            }
          />
        </TextRow>
        <StyledButton
          title={t(`button.${authMode}`)}
          isLoading={isLoginLoading}
          onClick={handleSubmit(handleAuth)}
        />
      </Wrapper>
    </AuthContainer>
  );
};

const StyledText = styled(Text.Small)`
  color: ${({ theme }) => theme.palette.grey600};
`;

const StyledButton = styled(Button).attrs(({ theme }) => ({
  color: theme.palette.teal,
  fontColor: theme.palette.ghostWhite,
}))``;

const TextRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const Wrapper = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
`;

const StyledPollIcon = styled(Icon.Poll)`
  width: 64px;
  height: 64px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
`;

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangeAuthModeButton = styled(Button).attrs(({ theme }) => ({
  fontSize: 'small',
  fontColor: theme.palette.teal,
  variant: 'link',
}))``;

export default AuthScreen;
