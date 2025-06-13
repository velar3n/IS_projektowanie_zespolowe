import { usePolls } from '@/api/poll/hooks';
import { Grid, Spinner, Stack, Text } from '@chakra-ui/react';
import SingleCard from './SingleCard';

const Cards = () => {
  const { data, isLoading } = usePolls('public');

  if (isLoading) {
    return <Spinner />;
  }

  const now = new Date();
  const activePolls = data?.filter(
    (poll) =>
      poll.public === true &&
      new Date(poll.startDate) <= now &&
      new Date(poll.endDate) >= now,
  );

  return (
    <Stack width="100%" gap="24px">
      <Text as="b">Browse surveys</Text>
      {data?.length === 0 && <Text>There are no surveys</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gapY="15px">
        {activePolls?.map((poll) => (
          <SingleCard
            key={poll.id}
            title={poll.title}
            description={poll.description}
            pollId={poll.id}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default Cards;
