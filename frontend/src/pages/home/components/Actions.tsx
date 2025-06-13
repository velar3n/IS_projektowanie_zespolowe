import {
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  Card,
  SimpleGrid,
  Flex,
  Container,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { useUserStore } from '@/stores/user';

const Actions = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  return (
    <Container maxWidth="1200px" p={[4, 6, 8]}>
      <Card.Root p={8} borderRadius="lg" boxShadow="md">
        <VStack gap={6} align="center" textAlign="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="blue.50"
            p={4}
            borderRadius="full"
            boxSize="80px"
          >
            <Icon as={BsFillBarChartFill} boxSize={10} color="blue.500" />
          </Flex>

          <Heading size="xl">
            {user ? `Welcome to Polify, ${user.username}!` : t('title')}
          </Heading>

          <Text fontSize="lg" maxWidth="600px">
            The simple and effective way to create and manage polls. Get started
            by creating your first poll or exploring existing ones.
          </Text>

          {!user ? (
            <VStack gap={4} width="100%" maxWidth="400px" mt={4}>
              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                onClick={() => navigate('/login')}
              >
                {t('button.login')}
              </Button>
              <Button
                variant="outline"
                width="100%"
                onClick={() => navigate('/login')}
              >
                {t('button.register')}
              </Button>
            </VStack>
          ) : (
            <VStack gap={6} width="100%" mt={4}>
              <VStack width="100%" alignItems="flex-start">
                <Heading size="md" mb={4}>
                  Action Tools
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} width="100%">
                  <Card.Root
                    p={4}
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => navigate('/polls')}
                    _hover={{ bg: 'blue.50' }}
                  >
                    <VStack align="center" gap={3}>
                      <AiOutlineEye size={24} color="var(--colors-blue-500)" />
                      <Text fontWeight="medium">View Polls</Text>
                    </VStack>
                  </Card.Root>
                  <Card.Root
                    p={4}
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => navigate('/polls')}
                    _hover={{ bg: 'blue.50' }}
                  >
                    <VStack align="center" gap={3}>
                      <BsFillBarChartFill
                        size={24}
                        color="var(--colors-blue-500)"
                      />
                      <Text fontWeight="medium">Manage Polls</Text>
                    </VStack>
                  </Card.Root>
                  <Card.Root
                    p={4}
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => navigate('/polls/poll')}
                    _hover={{ bg: 'blue.50' }}
                  >
                    <VStack align="center" gap={3}>
                      <AiOutlinePlus
                        size={24}
                        color="var(--colors-green-500)"
                      />
                      <Text fontWeight="medium">Create Poll</Text>
                    </VStack>
                  </Card.Root>

                  {user?.roles && user.roles.includes('ADMIN') && (
                    <Card.Root
                      p={4}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => navigate('/users')}
                      _hover={{ bg: 'blue.50' }}
                    >
                      <VStack align="center" gap={3}>
                        <AiOutlineUser
                          size={24}
                          color="var(--colors-purple-500)"
                        />
                        <Text fontWeight="medium">Manage Users</Text>
                      </VStack>
                    </Card.Root>
                  )}
                </SimpleGrid>
              </VStack>
            </VStack>
          )}
        </VStack>
      </Card.Root>
    </Container>
  );
};

export default Actions;
