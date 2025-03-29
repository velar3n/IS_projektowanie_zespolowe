import { Flex, Spinner } from '@chakra-ui/react';

const FullScreenSpinner = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Spinner size="xl" />
    </Flex>
  );
};

export default FullScreenSpinner;
