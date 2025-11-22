import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import type { GetChatQueryVariables } from '../gql/graphql';

const getChatDocument = graphql(`
  query GetChat($_id: String!) {
    chat(_id: $_id) {
      _id
      name
      latestMessage {
        _id
        content
        createdAt
        chatId
        user {
          _id
          email
          username
        }
      }
    }
  }
`);

const useGetChat = (variables: GetChatQueryVariables) =>
  useQuery(getChatDocument, { variables });

export { useGetChat };
