import { Button, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

type AddElementButtonProps = {
  variant?: 'surface' | 'outline';
  size?: 'small' | 'big';
  title: string;
  isError?: boolean;
  onClick: () => void;
};

const AddElementButton = ({
  title,
  onClick,
  variant = 'outline',
  size = 'big',
  isError = false,
}: AddElementButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      py={size === 'big' ? '32px' : undefined}
      px="12px"
      gap="12px"
      justifyContent="center"
      alignItems="center"
      colorPalette={isError ? 'red' : undefined}
      borderRadius="8px"
      _hover={{
        cursor: 'pointer',
      }}
    >
      <FaPlus size={18} />
      <Text>{title}</Text>
    </Button>
  );
};

export default AddElementButton;
