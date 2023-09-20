import { gql } from "@apollo/client";

export const LoginQuery = gql`
  query Login_Query($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
