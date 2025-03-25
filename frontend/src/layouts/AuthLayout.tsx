import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const AuthLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
