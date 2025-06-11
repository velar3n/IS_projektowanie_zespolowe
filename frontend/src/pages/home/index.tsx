import { Stack } from '@chakra-ui/react';
import Actions from './components/Actions';
import Cards from './components/Cards';

const Home = () => {
  return (
    <Stack width="1200px" justifyContent="center" alignItems="center">
      <Actions />
      <Cards />
    </Stack>
  );
};

export default Home;
