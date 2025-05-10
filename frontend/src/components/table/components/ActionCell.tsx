import { Flex, IconButton, Menu, Portal } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ActionMenuConfig } from './types';

const ActionCell = ({ config }: { config: ActionMenuConfig[] }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant="ghost">
            <BsThreeDotsVertical />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content p="8px">
              {config.map((item) => (
                <Menu.Item
                  p="4px"
                  key={item.value}
                  value={item.value}
                  onClick={item.onClick}
                  {...(item.destructive
                    ? {
                        color: 'fg.error',
                        _hover: { bg: 'bg.error', color: 'fg.error' },
                      }
                    : {})}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};

export default ActionCell;
