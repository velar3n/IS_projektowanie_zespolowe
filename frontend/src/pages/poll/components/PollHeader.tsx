import { PollResponse } from '@/api/poll/types';
import { formatDate } from '@/utils/date';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';

import { FaCalendar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type PollHeaderProps = Partial<
  Pick<PollResponse, 'title' | 'description' | 'startDate' | 'endDate'>
> & {
  pollId?: number;
  shouldShowResultsButton?: boolean;
  isSummary?: boolean;
  onSubmit?: () => void;
};

const PollHeader = ({
  title,
  pollId,
  isSummary = false,
  description,
  startDate,
  endDate,
  shouldShowResultsButton = false,
  onSubmit,
}: PollHeaderProps) => {
  const navigate = useNavigate();
  return (
    <Stack width="100%" gap="20px">
      <Stack>
        <HStack justify="space-between">
          <Text as="b" fontSize="4xl">
            {`${title}${isSummary ? ' - Results' : ''}`}
          </Text>
          {onSubmit && (
            <Button onClick={onSubmit} px="32px">
              Submit
            </Button>
          )}
          {shouldShowResultsButton && pollId && (
            <Button
              px="32px"
              onClick={() => {
                navigate(`/poll/${pollId}/results`);
              }}
            >
              Show results
            </Button>
          )}
        </HStack>
        <Text>{description}</Text>
      </Stack>
      <HStack color="gray.500">
        <HStack>
          <FaCalendar />
          <Text>{`Start date: ${startDate && formatDate(startDate)}`}</Text>
        </HStack>
        <HStack>
          <FaCalendar />
          <Text>{`End date: ${endDate && formatDate(endDate)}`}</Text>
        </HStack>
      </HStack>
    </Stack>
  );
};

export default PollHeader;
