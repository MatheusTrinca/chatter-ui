import { useMutation } from '@apollo/client';
import { graphql } from '../gql';
import { updateMessages } from '../cache/messages';
import { updateLatestMessage } from '../cache/latest-message';

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () =>
  useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage as any);
        updateLatestMessage(cache, data.createMessage as any);
      }
    },
  });

export { useCreateMessage };
