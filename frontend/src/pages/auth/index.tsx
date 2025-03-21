import { Icon, Text } from '@app/ui/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AuthFormData } from './types';
import LoginForm from './components/LoginForm';

const AuthScreen = () => {
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<AuthFormData>();

  return (
    <AuthContainer>
      <Wrapper>
        <Header>
          <StyledPollIcon />
          <Text.H1>{t('title')}</Text.H1>
        </Header>
        <LoginForm control={control} />
      </Wrapper>
    </AuthContainer>
  );
};

const Wrapper = styled.div`
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
`;

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AuthScreen;
