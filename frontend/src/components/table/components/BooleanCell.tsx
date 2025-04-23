import { Flex, useToken } from '@chakra-ui/react';

const BooleanCell = ({ value }: { value: boolean }) => {
  const [red, green] = useToken('colors', ['red.500', 'green.500']);
  return (
    <Flex justifyContent="center" alignItems="center">
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: value ? green : red,
        }}
      ></div>
    </Flex>
  );
};

export default BooleanCell;
