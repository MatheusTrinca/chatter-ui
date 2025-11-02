import { useSubscription } from '@apollo/client';
import { graphql } from '../gql';
import type { SubscriptionMessageCreatedArgs } from '../gql/graphql';

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      _id
      content
      createdAt
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) =>
  useSubscription(messageCreatedDocument, { variables });

export { useMessageCreated };
