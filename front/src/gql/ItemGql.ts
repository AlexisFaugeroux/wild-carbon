import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
  mutation CreateItem($label: String!, $emissionFactor: Float!, $unit: String!, $category: String!) {
    createItem(label: $label, emissionFactor: $emissionFactor, unit: $unit, category: $category) {
      id
      label
      emissionFactor
      unit
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($itemId: String!, $label: String!, $emissionFactor: Float!, $unit: String!, $category: String!) {
    updateItem(itemId: $itemId, label: $label, emissionFactor: $emissionFactor, unit: $unit, category: $category) {
      id
      label
      emissionFactor
      unit
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: String!) {
    deleteItem(itemId: $itemId)
  }
`;

export const GET_ITEM = gql`
  query GetItem($itemId: String!) {
    getItem(itemId: $itemId) {
      id
      label
      emissionFactor
      unit
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      id
      label
      emissionFactor
      unit
      createdAt
      updatedAt
    }
  }
`;

export const GET_ITEMS_BY_CATEGORY = gql`
query GetItemsByCategory($categoryId: string) {
  getAllItemsByCategory(categoryId: $categoryId) {
    id
    label
    emissionFactor
    unit
    createdAt
    updatedAt
  }
}
`;