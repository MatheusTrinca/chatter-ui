import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

export const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

const useGetChats = () => useQuery(getChatsDocument);

export { useGetChats };
