import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
mutation Mutation($date: String!, $quantity: Float!, $title: String!, $itemId: String!) {
    createExpense(date: $date, quantity: $quantity, title: $title, itemId: $itemId)
  }
`;

export const GET_EXPENSE_BY_USER_ID = gql `
query getExpensesByUserId($userId: String!) {
  getAllExpensesByUserId(userId: $userId) {
    id
    title
    quantity
    emissionTotal
    createdAt
    item {
      id
      label
      unit
      emissionFactor
      category {
        id
      }
    }
  }
}`

export const DELETE_EXPENSE_BY_ID = gql `
mutation DeleteExpense($expenseId: String!) {
  deleteExpense(expenseId: $expenseId)
}`

export const UPDATE_EXPENSE_BY_ID = gql `
mutation Mutation($date: String!, $quantity: Float!, $title: String!, $itemId: String!, $updateExpenseId: String!) {
  updateExpense(date: $date, quantity: $quantity, title: $title, itemId: $itemId, id: $updateExpenseId){
    date
    itemId
    quantity
    title
  }
}`