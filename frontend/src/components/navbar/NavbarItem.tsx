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

  const isActive = pathname === item.path;

  if (item.requiredRole && !userRoles?.includes(item.requiredRole)) return null;

  return (
    <Button
      variant="plain"
      borderBottomWidth="1px"
      borderBottom={isActive ? 'solid black' : undefined}
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
