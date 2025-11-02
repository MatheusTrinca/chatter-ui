import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { getMessagesDocument } from './useGetMessages';

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      _id
      content
      createdAt
    }
  }
`);

const useCreateMessage = (chatId: string) =>
  useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (!data?.createMessage) return;

      const messageQueryOptions = {
        query: getMessagesDocument,
        variables: { chatId },
      };

      const existingMessages = cache.readQuery({
        ...messageQueryOptions,
      });

      if (existingMessages?.messages) {
        cache.writeQuery({
          ...messageQueryOptions,
          data: {
            messages: [...existingMessages.messages, data.createMessage],
          },
        });
      }
    },
  });

export { useCreateMessage };
