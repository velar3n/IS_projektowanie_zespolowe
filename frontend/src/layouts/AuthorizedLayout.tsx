import Navbar from '@/components/navbar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const WithNavbarLayout = () => {
  return (
    <Box>
      <Navbar />
      <Flex justifyContent="center" alignItems="center" paddingTop="30px">
        <Outlet />
      </Flex>
    </Box>
  );
};
export default WithNavbarLayout;
