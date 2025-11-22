import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import type { SubscriptionMessageCreatedArgs } from '../gql/graphql';
import { updateMessages } from '../cache/messages';

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      _id
      content
      createdAt
      chatId
      user {
        _id
        email
      }
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) =>
  useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated as any);
      }
    },
  });

export { useMessageCreated };
