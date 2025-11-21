import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import type { GetMessagesQueryVariables } from '../gql/graphql';

export const getMessagesDocument = graphql(`
  query GetMessages($chatId: String!) {
    messages(chatId: $chatId) {
      _id
      content
      createdAt
      chatId
    }
  }
`);

const useGetMessages = (variables: GetMessagesQueryVariables) =>
  useQuery(getMessagesDocument, { variables });

export { useGetMessages };
