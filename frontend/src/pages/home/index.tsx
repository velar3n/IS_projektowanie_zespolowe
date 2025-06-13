import { Stack } from '@chakra-ui/react';
import Cards from './components/Cards';

const Home = () => {
  return (
    <Stack width="1200px" justifyContent="center" alignItems="center">
      <Cards />
    </Stack>
  );
};

export default Home;
