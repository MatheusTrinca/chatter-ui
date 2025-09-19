import { useGetMe } from '../../hooks/useGetMe';
import excludedRoutes from '../../constants/excluded-routes';
import { useEffect } from 'react';
import { atuthenticatedVar } from '../../constants/authenticated';
import { snackVar } from '../../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../../constants/errors';

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();

  useEffect(() => {
    if (user) {
      atuthenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  const pathname = window.location.pathname;

  return <>{excludedRoutes.includes(pathname) ? children : user && children}</>;
};

export default Guard;
