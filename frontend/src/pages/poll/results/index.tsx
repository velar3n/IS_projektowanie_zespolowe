import { usePollResults } from '@/api/poll/hooks';
import { Button, Stack, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import PollHeader from '../components/PollHeader';
import Question from './components/Question';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { FaRegSadCry } from 'react-icons/fa';
import { useUserStore } from '@/stores/user';

const PollResults = () => {
  const { pollId } = useParams();
  const { data, isLoading } = usePollResults(pollId);

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  const isEmpty = data?.questions.length === 0;
  const endDate = data?.survey.endDate ? new Date(data.survey.endDate) : null;
  const currentDate = new Date();
  const isFinished = endDate ? currentDate >= endDate : undefined;

  return (
    <Stack>
      <PollHeader
        isSummary
        title={data?.survey.title}
        description={data?.survey.description}
        startDate={data?.survey.startDate}
        endDate={data?.survey.endDate}
      />
      <Stack>
        {isEmpty && (
          <Stack
            gap="12px"
            mt="64px"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            border="1px dotted black"
            borderRadius="xl"
            p="32px"
          >
            <Text>There are no answers to this poll!</Text>
            <FaRegSadCry size={128} />
            {isFinished !== undefined && !isFinished && user && (
              <Button w="100%" onClick={() => navigate(`/poll/${pollId}`)}>
                Be the first to vote
              </Button>
            )}
          </Stack>
        )}
        {data?.questions.map((question, index) => (
          <Question
            key={question.id}
            title={question.text}
            index={index}
            answers={question.results}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PollResults;
