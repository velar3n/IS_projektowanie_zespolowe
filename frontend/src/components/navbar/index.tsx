import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import NavbarItem from './NavbarItem';
import PollIcon from '../icons/Poll';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';
import { useNavigate } from 'react-router-dom';

const navbarItems = [
  {
    path: '/',
    key: 'home',
    icon: <FaHome />,
  },
];

const Navbar = () => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  const isLoggedId = true;

  return (
    <Flex
      width="100%"
      py="32px"
      px="64px"
      flexDirection="row"
      boxShadow="sm"
      justifyContent="space-between"
    >
      <HStack gap="64px">
        <HStack cursor="pointer" onClick={() => navigate('/')}>
          <PollIcon width="40px" />
          <Text fontSize="3xl" fontWeight="medium">
            {t('logo')}
          </Text>
        </HStack>
        <HStack>
          {navbarItems.map((item) => (
            <NavbarItem item={item} />
          ))}
        </HStack>
      </HStack>
      <Box>{isLoggedId ? <UserAvatar /> : <Button>{t('Login')}</Button>}</Box>
    </Flex>
  );
};

export default Navbar;
