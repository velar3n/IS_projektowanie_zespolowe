import { useUserSubmissions } from '@/api/poll/hooks';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { Stack, Text } from '@chakra-ui/react';
import SingleSubmission from './components/SingleSubmission';

const MySubmissions = () => {
  const { data, isLoading } = useUserSubmissions();
  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <Stack gap="32px">
      <Text fontSize="2xl" as="b">
        My Submissions
      </Text>
      {data?.length === 0 && <Text>There is nothing to show</Text>}
      <Stack>
        {data?.map((submission) => (
          <SingleSubmission
            pollId={submission.survey.id}
            submissionId={submission.id}
            key={submission.id}
            title={submission.survey.title}
            description={submission.survey.description}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default MySubmissions;
