import { gql } from '@apollo/client';

export const GET_DONATIONS_AMOUNT = gql`
  query GetDonationsAmount {
    getDonationsAmount {
      amount
    }
  }
`;
