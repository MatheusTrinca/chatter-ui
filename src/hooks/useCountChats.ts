import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOWN_ERROR_MESSAGE } from '../constants/errors';

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/chats/count`, {
      credentials: 'include',
    });

    if (!res.ok) {
      snackVar({
        type: 'error',
        message: UNKNOWN_ERROR_MESSAGE,
      });
      return;
    }

    setChatsCount(parseInt(await res.text()));
  }, []);

  return { countChats, chatsCount };
};

export { useCountChats };
