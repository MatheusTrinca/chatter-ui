import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import type { SubscriptionMessageCreatedArgs } from '../gql/graphql';
import { updateMessages } from '../cache/messages';
import { updateLatestMessage } from '../cache/latest-message';

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) =>
  useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated as any);
        updateLatestMessage(client.cache, data.data.messageCreated as any);
      }
    },
  });

export { useMessageCreated };
