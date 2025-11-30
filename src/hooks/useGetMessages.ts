import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import type { GetMessagesQueryVariables } from '../gql/graphql';

export const getMessagesDocument = graphql(`
  query GetMessages($chatId: String!, $skip: Int!, $limit: Int!) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: GetMessagesQueryVariables) =>
  useQuery(getMessagesDocument, { variables });

export { useGetMessages };
