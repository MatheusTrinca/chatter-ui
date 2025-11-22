import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ...UserFragment
    }
  }
`);

const useCreateUser = () => useMutation(createUserDocument);

export { useCreateUser };
