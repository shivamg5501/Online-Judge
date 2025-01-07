import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { AccountContext } from '../../contest/AccountProvider';
const url="http://localhost:8000";
const ImageProfileDefault = ({ onClick }) => {
  const { account } = useContext(AccountContext);

  return (
    <Stack direction="row" spacing={2}>
      <div onClick={onClick}>
        {account ? (
          // Content to render when account exists
          // Example: <Avatar src={account.profileImage} />
          <Avatar src={`${account.ImageName}`} />
        ) : (
          // Content to render when account is not available
          <Avatar src="/broken-image.jpg" />
        )}
      </div>
    </Stack>
  );
};

export default ImageProfileDefault;
