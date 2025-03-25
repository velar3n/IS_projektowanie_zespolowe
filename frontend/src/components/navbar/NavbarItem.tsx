import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { NavbarItemType } from './types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NavbarItem = ({ item }: { item: NavbarItemType }) => {
  const { t } = useTranslation('navigation', { keyPrefix: 'items' });
  const { pathname } = useLocation();

  const isActive = pathname === item.path;

  return (
    <Button
      variant="plain"
      borderBottomWidth={isActive ? '2px' : undefined}
      borderBottom="solid black"
    >
      <HStack>
        <Icon>{item.icon}</Icon>
        <Text>{t(item.key)}</Text>
      </HStack>
    </Button>
  );
};

export default NavbarItem;
