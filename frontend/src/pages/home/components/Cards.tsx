import { usePolls } from '@/api/poll/hooks';
import { Grid, Spinner, Stack, Text } from '@chakra-ui/react';
import SingleCard from './SingleCard';

const Cards = () => {
  const { data, isLoading } = usePolls('all');

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack width="100%">
      <Text as="b">Browse surveys</Text>
      <Grid templateColumns="repeat(3, 1fr)">
        {data &&
          Array.isArray(data) &&
          data.map((poll) => (
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
