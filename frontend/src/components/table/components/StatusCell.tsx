import { Flex, useToken } from '@chakra-ui/react';
import Dot from './shared';

export type StatusCellConfig<T extends string> = Record<
  T,
  {
    color: string;
    label: string;
  }
>;

type StatusCellProps<T extends string> = {
  status: T;
  config: StatusCellConfig<T>;
};
const StatusCell = <T extends string>({
  status,
  config,
}: StatusCellProps<T>) => {
  const { color, label } = config[status];
  const [colorToken] = useToken('colors', [color]);
  return (
    <Flex w="100%" justifyContent="center">
      <Dot color={colorToken} text={label} />
    </Flex>
  );
};

export default StatusCell;
