import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type NavigationCellProps = {
  label: string;
  destination: string;
};

const NavigationCell = ({ label, destination }: NavigationCellProps) => {
  const navigate = useNavigate();

  return (
    <Text
      _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() => navigate(destination)}
    >
      {label}
    </Text>
  );
};

export default NavigationCell;
