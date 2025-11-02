import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState('');
  const { path } = usePath();

  useEffect(() => {
    const chatId = path.split('chats/')[1];
    if (chatId) {
      setSelectedChatId(chatId);
    }
  }, [path]);

  const { data } = useGetChats();

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            maxHeight: '80vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}
        >
          {data?.chats
            .map(chat => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selected={chat._id === selectedChatId}
              />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
