import { useToken } from '@chakra-ui/react';
import Dot from './shared';

const BooleanCell = ({ value }: { value: boolean }) => {
  const [red, green] = useToken('colors', ['red.500', 'green.500']);
  return <Dot color={value ? green : red} />;
};

export default BooleanCell;
