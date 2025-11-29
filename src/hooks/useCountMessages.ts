import { useCallback, useState } from 'react';
import { API_URL } from '../constants/urls';
import { snackVar } from '../constants/snack';
import { UNKNOWN_ERROR_MESSAGE } from '../constants/errors';

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`, {
      credentials: 'include',
    });

    if (!res.ok) {
      snackVar({
        type: 'error',
        message: UNKNOWN_ERROR_MESSAGE,
      });
      return;
    }

    const { messages } = await res.json();

    setMessagesCount(messages);
  }, [chatId]);

  return { countMessages, messagesCount };
};

export { useCountMessages };
