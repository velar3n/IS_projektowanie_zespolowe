import Navbar from '@/components/navbar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const WithNavbarLayout = () => {
  return (
    <Box>
      <Navbar />
      <Flex justifyContent="center" alignItems="center" py="32px">
        <Outlet />
      </Flex>
    </Box>
  );
};
export default WithNavbarLayout;
