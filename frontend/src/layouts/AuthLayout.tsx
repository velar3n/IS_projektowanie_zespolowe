import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useUserStore } from '@/stores/user';

const AuthLayout = () => {
  const user = useUserStore((store) => store.user);
  const navigate = useNavigate();
  if (user) {
    navigate('/');
  }

  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
