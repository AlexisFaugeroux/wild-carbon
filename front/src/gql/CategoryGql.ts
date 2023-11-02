import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryId: String!, $name: String!) {
    updateCategory(categoryId: $categoryId, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId)
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($categoryId: String!) {
    getCategory(categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const GET_CATEGORY_AND_ITEM = gql`
  query GetCategory($categoryId: String!) {
    getCategory(categoryId: $categoryId) {
      items {
        id
        label
        emissionFactor
        unit
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategory {
      id
      name
    }
  }
`;
