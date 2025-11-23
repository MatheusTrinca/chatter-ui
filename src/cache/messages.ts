import type { ApolloCache } from '@apollo/client';
import { getMessagesDocument } from '../hooks/useGetMessages';
import type { Message } from '../gql/graphql';

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messageQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };

  const messages = cache.readQuery({
    ...messageQueryOptions,
  });

  if (messages?.messages) {
    cache.writeQuery({
      ...messageQueryOptions,
      data: {
        messages: (messages?.messages || []).concat(message),
      },
    });
  }
};
