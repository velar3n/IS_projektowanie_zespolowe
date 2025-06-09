import { usePollResults } from '@/api/poll/hooks';
import { Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import PollHeader from '../components/PollHeader';
import Question from './components/Question';
import FullScreenSpinner from '@/components/FullScreenSpinner';

const PollResults = () => {
  const { pollId } = useParams();
  const { data, isLoading } = usePollResults(pollId);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

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
