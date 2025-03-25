import Navbar from '@/components/navbar';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default HomeLayout;
