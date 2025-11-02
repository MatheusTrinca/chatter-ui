import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { RouterProvider } from 'react-router';
import router from './components/Routes';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './constants/apollo-client';
import Guard from './components/auth/Guard';
import Header from './components/header/Header';
import Snackbar from './components/snackbar/Snackbar';
import ChatList from './components/chat-list/ChatList';
import { usePath } from './hooks/usePath';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const { path } = usePath();

  const showChatList = path === '/' || path.includes('chats');

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth="xl">
            {showChatList ? (
              <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
                  <ChatList />
                </Grid>
                <Grid size={{ xs: 12, md: 7, lg: 8, xl: 9 }}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
