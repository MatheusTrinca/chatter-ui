import AddCircle from '@mui/icons-material/AddCircle';
import { AppBar, IconButton, Toolbar } from '@mui/material';

const ChatListHeader = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
