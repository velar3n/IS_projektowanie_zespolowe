import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { NavbarItemType } from './types';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user';

const NavbarItem = ({ item }: { item: NavbarItemType }) => {
  const { t } = useTranslation('navigation', { keyPrefix: 'items' });
  const { pathname } = useLocation();
  const userRoles = useUserStore((state) => state.user?.roles);
  const navigate = useNavigate();

  const getIsPathActive = () => {
    const pathParts = pathname.split('/');
    pathParts.shift();

    const itemPath = item.path.replace('/', '');

    if (itemPath === pathParts[0]) {
      return true;
    }
    return false;
  };

  getIsPathActive();

  if (item.requiredRole && !userRoles?.includes(item.requiredRole)) return null;

  return (
    <Button
      variant="plain"
      borderBottomWidth="1px"
      borderBottom={getIsPathActive() ? 'solid black' : undefined}
      onClick={() => navigate(item.path)}
    >
      <HStack>
        <Icon>{item.icon}</Icon>
        <Text>{t(item.key)}</Text>
      </HStack>
    </Button>
  );
};

export default NavbarItem;
