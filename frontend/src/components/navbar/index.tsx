import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { FaHome, FaUser } from 'react-icons/fa';
import NavbarItem from './NavbarItem';
import PollIcon from '../icons/Poll';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogin } from 'react-icons/md';
import { useUserStore } from '@/stores/user';
import { FaChartBar } from 'react-icons/fa6';
import { NavbarItemType } from './types';

const navbarItems: NavbarItemType[] = [
  {
    path: '/',
    key: 'home',
    icon: <FaHome />,
  },
  {
    path: '/users',
    key: 'users',
    icon: <FaUser />,
    requiredRole: 'ADMIN',
  },
  {
    path: '/polls',
    key: 'polls',
    icon: <FaChartBar />,
    requiredRole: 'ADMIN',
  },
];

const Navbar = () => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

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
        <HStack gap="32px" alignItems="center">
          {navbarItems.map((item) => (
            <NavbarItem item={item} key={item.path} />
          ))}
        </HStack>
      </HStack>
      <Box>
        {user ? (
          <UserAvatar />
        ) : (
          <Button
            px="24px"
            variant="outline"
            colorPalette="purple"
            alignItems="center"
            onClick={() => navigate('/login')}
          >
            <MdOutlineLogin /> {t('Login')}
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
