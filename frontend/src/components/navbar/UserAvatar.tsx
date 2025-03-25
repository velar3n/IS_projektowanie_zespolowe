import { useLogout } from '@/api/auth/hooks';
import { useUserStore } from '@/stores/user';
import {
  Avatar,
  Box,
  Button,
  Popover,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const USER_NAME = 'John Doe';

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navigation', { keyPrefix: 'popover' });
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const userName = useUserStore((state) => state.user?.name);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Box>
          <Avatar.Root size="lg" onClick={() => setOpen(true)} cursor="pointer">
            <Avatar.Fallback name={userName ?? ''} />
          </Avatar.Root>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Stack padding="32px" alignItems="center" width="100%" gap="12px">
                <Text>{t('title', { name: USER_NAME })}</Text>
                <Separator width="100%" />
                <Button
                  width="100%"
                  colorPalette="red"
                  onClick={() => logout()}
                  loading={isLogoutPending}
                >
                  {t('logout')}
                </Button>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default UserAvatar;
