import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useCreateChat } from '../../../hooks/useCreateChat';
import { UNKNOWN_ERROR_MESSAGE } from '../../../constants/errors';
import router from '../../Routes';

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [createChat] = useCreateChat();

  const onClose = () => {
    setName('');
    setError('');
    setIsPrivate(false);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Chat
          </Typography>
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked={isPrivate}
                  onChange={e => setIsPrivate(e.target.checked)}
                  value={isPrivate}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField
              label="Name"
              onChange={e => setName(e.target.value)}
              value={name}
              error={!!error}
              helperText={error}
            />
          )}
          <Button
            variant="outlined"
            onClick={async () => {
              if (!name) {
                setError('Name is required');
                return;
              }
              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: {
                      name,
                      isPrivate,
                    },
                  },
                });
                router.navigate(`/chats/${chat.data?.createChat._id}`);
                onClose();
              } catch (err) {
                setError(UNKNOWN_ERROR_MESSAGE);
                return;
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
