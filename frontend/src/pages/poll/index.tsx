import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const SinglePoll = () => {
  const { pollId } = useParams();
  return <Text>Poll {pollId}</Text>;
};

export default SinglePoll;
