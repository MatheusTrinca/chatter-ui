import { useGetMe } from '../../hooks/useGetMe';
import excludedRoutes from '../../constants/excluded-routes';
import { useEffect } from 'react';
import { atuthenticatedVar } from '../../constants/authenticated';
import { snackVar } from '../../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../../constants/errors';
import { usePath } from '../../hooks/usePath';

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

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

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
