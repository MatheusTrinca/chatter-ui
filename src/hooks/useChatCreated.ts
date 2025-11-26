// import { useSubscription } from '@apollo/client';
// import { graphql } from '../gql';
// import { updateChats } from '../cache/chats';

// const chatCreatedDocument = graphql(`
//   subscription ChatCreated {
//     chatCreated {
//       ...ChatFragment
//     }
//   }
// `);

// const useChatCreated = () =>
//   useSubscription(chatCreatedDocument, {
//     onData: ({ client, data }) => {
//       if (data.data) {
//         updateChats(client.cache, data.data.chatCreated as any);
//       }
//     },
//   });

// export { useChatCreated };
