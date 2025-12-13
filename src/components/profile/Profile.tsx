import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useGetMe } from '../../hooks/useGetMe';
import { UploadFile } from '@mui/icons-material';
import type { SyntheticEvent } from 'react';
import { API_URL } from '../../constants/urls';
import { snackVar } from '../../constants/snack';

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: SyntheticEvent) => {
    try {
      const formData = new FormData();
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        formData.append('file', file);
      }
      const res = await fetch(`${API_URL}/users/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error uploading image.');
      }
      snackVar({
        type: 'success',
        message: 'Image uploaded successfully.',
      });
    } catch (error) {
      console.error(error);
      snackVar({
        type: 'error',
        message: 'Error uploading image.',
      });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5rem',
      }}
    >
      <Typography variant="h1">{me?.data?.me?.username}</Typography>
      <Avatar
        sx={{ width: 256, height: 256 }}
        src={me?.data?.me?.imageUrl}
      ></Avatar>
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;
