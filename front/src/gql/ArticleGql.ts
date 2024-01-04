import { gql } from "@apollo/client";

export const GET_ALL_ARTICLES = gql`
  query getAllArticle {
    getAllArticle {
      id
      title
      description
      url
      createdAt
      updatedAt
      user {
        id
        pseudo
        email
        password
      }
    }
  }
`;