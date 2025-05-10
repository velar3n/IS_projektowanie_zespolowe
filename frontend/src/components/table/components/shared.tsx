import { Flex, Popover, Portal } from '@chakra-ui/react';
import { useState } from 'react';

type DotProps = {
  color: string;
  text?: string;
};

const Dot = ({ color, text }: DotProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={!!text && open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger>
        <Flex
          justifyContent="center"
          alignItems="center"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: color,
            }}
          ></div>
        </Flex>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="fit-content">
            <Popover.Arrow />
            <Popover.Body>
              <Flex
                justifyContent="center"
                alignItems="center"
                px="24px"
                py="12px"
              >
                {text}
              </Flex>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default Dot;
