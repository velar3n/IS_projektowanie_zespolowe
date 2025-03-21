import { Text } from '@app/ui/components';
import Button from '@app/ui/components/button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Text.H1>HOME</Text.H1>
      <Button title="Go to auth" onClick={() => navigate('/login')} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

export default Home;
