import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type SingleSubmissionProps = {
  title: string;
  description: string;
  pollId: number;
  submissionId: number;
};

const SingleSubmission = ({
  title,
  description,
  pollId,
  submissionId,
}: SingleSubmissionProps) => {
  const navigate = useNavigate();
  return (
    <HStack
      width="100%"
      border="1px dotted black"
      borderRadius="lg"
      padding="12px"
      gap="32px"
      justifyContent={'space-between'}
    >
      <HStack>
        <Stack>
          <Text as="b">{title}</Text>
          <Text>{description}</Text>
        </Stack>
      </HStack>
      <Stack>
        <Button
          onClick={() => {
            navigate(`/poll/${pollId}/results`);
          }}
          px="12px"
        >
          See results
        </Button>
        <Button
          onClick={() => {
            navigate(`/poll/${pollId}?submissionId=${submissionId}`);
          }}
          px="12px"
        >
          See my answers
        </Button>
      </Stack>
    </HStack>
  );
};

export default SingleSubmission;
