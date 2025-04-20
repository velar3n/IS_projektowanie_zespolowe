import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ConfirmationModalProps = {
  trigger: ReactNode;
  destructive?: boolean;
  header?: string;
  body?: string;
  action: () => void;
};

const ConfirmationModal = ({
  header,
  trigger,
  body,
  destructive,
  action,
}: ConfirmationModalProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'dialog' });
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      lazyMount
      unmountOnExit
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="24px">
            <Dialog.Header>
              <Dialog.Title>{header ?? t('header')}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {body ?? (destructive ? t('destructive') : undefined)}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" px="10px">
                  {t('cancel')}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette={destructive ? 'red' : 'blue'}
                px="10px"
                onClick={() => {
                  action();
                  setOpen(false);
                }}
              >
                {t('continue')}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;
