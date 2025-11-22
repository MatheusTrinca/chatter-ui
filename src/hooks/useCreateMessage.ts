import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { updateMessages } from '../cache/messages';

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
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
`);

const useCreateMessage = () =>
  useMutation(createMessageDocument, {
    update(cache, { data }) {
      console.log('data', data);
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage as any);
      }
    },
  });

export { useCreateMessage };
