import { Avatar } from '@chakra-ui/react';

const USER_NAME = 'John Doe';

const UserAvatar = () => {
  return (
    <Avatar.Root size="lg">
      <Avatar.Fallback name={USER_NAME} />
    </Avatar.Root>
  );
};

export default UserAvatar;
