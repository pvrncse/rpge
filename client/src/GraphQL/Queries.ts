import { gql } from '@apollo/client';
export const LOAD_USERS = gql`
query{
    allUsers{
      id
      name
      email
      bio
    }
  }
`