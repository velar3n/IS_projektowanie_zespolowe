import { PollResponse } from '@/api/poll/types';
import { formatDate } from '@/utils/date';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';

import { FaCalendar } from 'react-icons/fa';

type PollHeaderProps = Partial<
  Pick<PollResponse, 'title' | 'description' | 'startDate' | 'endDate'>
> & {
  onSubmit?: () => void;
};

const PollHeader = ({
  title,
  description,
  startDate,
  endDate,
  onSubmit,
}: PollHeaderProps) => {
  return (
    <Stack width="100%" gap="20px">
      <Stack>
        <HStack justify="space-between">
          <Text as="b" fontSize="4xl">
            {title}
          </Text>
          {onSubmit && (
            <Button onClick={onSubmit} px="32px">
              Submit
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
