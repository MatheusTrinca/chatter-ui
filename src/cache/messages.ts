import type { ApolloCache } from '@apollo/client';
import { getMessagesDocument } from '../hooks/useGetMessages';
import type { Message } from '../gql/graphql';

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  console.log('message', message);
  const messageQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };

  const messages = cache.readQuery({
    ...messageQueryOptions,
  });

  console.log('messages', messages);

  if (messages?.messages) {
    cache.writeQuery({
      ...messageQueryOptions,
      data: {
        messages: (messages?.messages || []).concat(message),
      },
    });
  }
};
