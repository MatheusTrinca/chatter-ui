import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import type { GetChatQueryVariables } from '../gql/graphql';

const getChatDocument = graphql(`
  query GetChat($_id: String!) {
    chat(_id: $_id) {
      _id
      name
      isPrivate
      userId
      userIds
    }
  }
`);

const useGetChat = (variables: GetChatQueryVariables) =>
  useQuery(getChatDocument, { variables });

export { useGetChat };
