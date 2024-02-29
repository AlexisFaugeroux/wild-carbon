import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($pseudo: String!, $email: String!, $password: String!) {
    createUser(pseudo: $pseudo, email: $email, password: $password) {
      id
      pseudo
      email
    }
  }
`;

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


export const GET_USER_ARTICLE = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      id
      articles {
        id
        title
        description
        url
        createdAt
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      pseudo
      email
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: String!, $userIdToAdd: String!) {
    addFriend(userId: $userId, userIdToAdd: $userIdToAdd)
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: String!, $userIdToRemove: String!) {
    removeFriend(userId: $userId, userIdToRemove: $userIdToRemove)
  }
`;
