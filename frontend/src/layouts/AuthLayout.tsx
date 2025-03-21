import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AuthLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default AuthLayout;
