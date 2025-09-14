import router from '../components/Routes';
import client from '../constants/apollo-client';
import { atuthenticatedVar } from '../constants/authenticated';

export const onLogout = () => {
  atuthenticatedVar(false);
  router.navigate('/login');
  client.resetStore();
};
