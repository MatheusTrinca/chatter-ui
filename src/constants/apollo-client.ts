import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import excludedRoutes from './excluded-routes';
import { onLogout } from '../utils/logout';

const logoutLink = onError(error => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: logoutLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
