import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

export const getChatsDocument = graphql(`
  query Chats {
    chats {
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
        }
      }
    }
  }
`);

const useGetChats = () => useQuery(getChatsDocument);

export { useGetChats };
