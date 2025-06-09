import { SingleResult } from '@/api/poll/types';
import { HStack, Stack, Text } from '@chakra-ui/react';
import OptionResult from './OptionResult';

type QuestionProps = {
  title: string;
  index: number;
  answers: Array<SingleResult>;
};

const Question = ({ title, index, answers }: QuestionProps) => {
  return (
    <Stack>
      <HStack justifyContent={'space-between'}>
        <Text as="b">{`${index + 1}. ${title}`}</Text>
      </HStack>
      <Stack>
        {answers.map((answer, index) => (
          <OptionResult
            key={answer.id}
            text={answer.text}
            index={index}
            count={answer.count}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Question;
