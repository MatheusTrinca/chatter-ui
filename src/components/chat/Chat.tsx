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
import { PAGE_SIZE } from '../../constants/page-size';
import { useCountMessages } from '../../hooks/useCountMessages';
import InfiniteScroll from 'react-infinite-scroller';

const Chat = () => {
  const params = useParams();
  const location = useLocation();
  const divRef = useRef<HTMLDivElement | null>(null);

  const chatId = params._id!;

  const [message, setMessage] = useState('');

  const [createMessage] = useCreateMessage();
  const { data } = useGetChat({ _id: chatId });
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

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
    // if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
    setMessage('');
    scrollToBottom();
    // }
  }, [location.pathname, messages]);

  return (
    <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
      <h1>{data?.chat.name}</h1>
      <Box
        sx={{
          height: '70vh',
          overflow: 'auto',
          // '&::-webkit-scrollbar': {
          //   display: 'none',
          // },
          // '-ms-overflow-style': 'none',
          // 'scrollbar-width': 'none',
        }}
      >
        <InfiniteScroll
          pageStart={0}
          isReverse
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages?.length } })
          }
          hasMore={
            messages && messagesCount
              ? messages?.messages?.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map(message => (
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
        </InfiniteScroll>
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
