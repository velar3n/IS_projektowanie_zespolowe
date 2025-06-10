import { toaster } from '@/components/ui/toaster';
import { useUserStore } from '@/stores/user';
import { Box } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const isAllowed = user?.roles.includes('ADMIN');

  useLayoutEffect(() => {
    if (user && !isAllowed) {
      toaster.create({
        title: 'You are not allowed to visit this route',
        type: 'error',
      });
      navigate('/');
    }
  }, [isAllowed, navigate, user]);

  if (!isAllowed) return null;

  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};
export default AdminLayout;
