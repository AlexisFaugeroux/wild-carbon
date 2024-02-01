import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation Mutation(
    $date: String!
    $quantity: Float!
    $title: String!
    $itemId: String!
    $userId: String!
  ) {
    createExpense(
      date: $date
      quantity: $quantity
      title: $title
      itemId: $itemId
      userId: $userId
    )
  }
`;
