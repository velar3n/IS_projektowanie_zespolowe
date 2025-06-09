import { HStack, Text } from '@chakra-ui/react';

type SingleResultProps = {
  text: string;
  index: number;
  count: number;
};

const OptionResult = ({ text, index, count }: SingleResultProps) => {
  return (
    <HStack width="100%" justifyContent="space-between">
      <Text>{`${index + 1}. ${text}`}</Text>
      <Text as="b">{count}</Text>
    </HStack>
  );
};

export default OptionResult;
