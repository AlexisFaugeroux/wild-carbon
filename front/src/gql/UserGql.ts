import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
      success
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    userData(userId: $id) {
      id
      pseudo
      email
      users {
        id
        pseudo
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $pseudo: String
    $email: String
    $password: String
  ) {
    updateUser(
      userId: $id
      pseudo: $pseudo
      email: $email
      password: $password
    ) {
      pseudo
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(userId: $id) {
      confirmMessage
    }
  }
`;

export const REGISTER = gql`
    mutation Register($pseudo: String!, $email: String!, $password: String!) {
        register(pseudo: $pseudo, email: $email, password: $password) {
            token
            user {
                id
            }
            success
        }
    }
`;