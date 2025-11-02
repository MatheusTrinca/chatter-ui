import { useLocation, useParams } from 'react-router';
import { useGetChat } from '../../hooks/useGetChat';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import { useGetMessages } from '../../hooks/useGetMessages';

const Chat = () => {
  const params = useParams();
  const location = useLocation();
  const divRef = useRef<HTMLDivElement | null>(null);

  const chatId = params._id!;

  const [message, setMessage] = useState('');

  const [createMessage] = useCreateMessage(chatId);
  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  const handleCreateMessage = async () => {
    if (!message) return;
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage('');
    scrollToBottom();
  };

  useEffect(() => {
    setMessage('');
    scrollToBottom();
  }, [location, messages]);

  return (
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Box
        sx={{
          height: '70vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        {messages?.messages.map(message => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid size={{ xs: 2, lg: 1 }}>
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid size={{ xs: 10, lg: 11 }}>
              <Stack>
                <Paper sx={{ width: 'fit-content' }}>
                  <Typography sx={{ padding: '0.9rem' }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" marginLeft="0.25rem">
                  {new Date(message.createdAt).toLocaleString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          justifySelf: 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: '100%' }}
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
          value={message}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          sx={{ p: '10px' }}
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
