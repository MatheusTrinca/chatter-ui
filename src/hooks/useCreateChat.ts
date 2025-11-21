import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { getChatsDocument } from './useGetChats';

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      _id
      name
      isPrivate
      userId
      userIds
    }
  }
`);

const useCreateChat = () =>
  useMutation(createChatDocument, {
    update(cache, { data }) {
      if (data?.createChat) {
        const existingChats = cache.readQuery({
          query: getChatsDocument,
        });

        if (existingChats?.chats) {
          cache.writeQuery({
            query: getChatsDocument,
            data: {
              chats: [...existingChats.chats, data.createChat],
            },
          });
        }
      }
    },
  });

export { useCreateChat };
