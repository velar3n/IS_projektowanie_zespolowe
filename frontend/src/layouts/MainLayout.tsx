import { useSessionData } from '@/api/auth/hooks';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { useUserStore } from '@/stores/user';
import { ReactNode, useEffect } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData, isPending: isSessionDataPending } =
    useSessionData();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (sessionData) {
      setUser(sessionData);
    }
  }, [sessionData, setUser]);

  if (isSessionDataPending) return <FullScreenSpinner />;
  return children;
};

export default MainLayout;
