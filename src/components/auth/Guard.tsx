import { useGetMe } from '../../hooks/useGetMe';
import excludedRoutes from '../../constants/excluded-routes';
import { useEffect } from 'react';
import { atuthenticatedVar } from '../../constants/authenticated';

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      atuthenticatedVar(true);
    }
  }, [user]);

  const pathname = window.location.pathname;

  return <>{excludedRoutes.includes(pathname) ? children : user && children}</>;
};

export default Guard;
