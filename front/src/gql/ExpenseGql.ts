import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation Mutation(
    $expenseDate: String!
    $quantity: Float!
    $title: String!
    $itemId: String!
    $userId: String!
  ) {
    createExpense(
      expenseDate: $expenseDate
      quantity: $quantity
      title: $title
      itemId: $itemId
      userId: $userId
    )
  }
`;

export const GET_EXPENSE_BY_USER_ID = gql `
query getExpensesByUserId($userId: String!) {
  getAllExpensesByUserId(userId: $userId) {
    id
    title
    quantity
    emissionTotal
    expenseDate
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
mutation Mutation($userId: String!, $quantity: Float!, $title: String!, $itemId: String!, $id: String!) {
  updateExpense(userId: $userId, quantity: $quantity, title: $title, itemId: $itemId, id: $id){
    id
    item {
      id
    }
    quantity
    title
    user {
      id
    }
  }
}
`
