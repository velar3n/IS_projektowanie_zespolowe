import { Button, Card } from '@chakra-ui/react';
import { getRandomPastelColor } from './colors';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user';

type SingleCardProps = {
  title: string;
  description: string;
  pollId: number;
};

const SingleCard = ({ title, description, pollId }: SingleCardProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <div
        style={{
          backgroundColor: getRandomPastelColor(),
          width: '100%',
          height: 64,
        }}
      ></div>
      <Card.Body gap="2" p="12px">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2" p="12px">
        <Button
          variant="solid"
          px="12px"
          onClick={() =>
            user
              ? navigate(`/poll/${pollId}`)
              : navigate(`/poll/${pollId}/results`)
          }
        >
          {user ? 'Vote' : 'See results'}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default SingleCard;
