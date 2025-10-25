import AddCircle from '@mui/icons-material/AddCircle';
import { AppBar, IconButton, Toolbar } from '@mui/material';

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={handleAddChat}
        >
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
