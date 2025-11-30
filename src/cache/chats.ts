// import type { ApolloCache } from '@apollo/client';
// import type { Chat } from '../gql/graphql';
// import { getChatsDocument } from '../hooks/useGetChats';

// export const updateChats = (cache: ApolloCache<any>, chat: Chat) => {
//   const chatsQueryOptions = {
//     query: getChatsDocument,
//   };

//   const chats = cache.readQuery({
//     ...chatsQueryOptions,
//   });

//   if (chats?.chats) {
//     cache.writeQuery({
//       ...chatsQueryOptions,
//       data: {
//         chats: (chats?.chats || []).concat(chat),
//       },
//     });
//   }
// };
