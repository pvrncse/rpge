import { gql } from "@apollo/client";
interface UserCreateInput {
  email: string;
  name?: string;
  bio: string;
  id?: number;
}
export const CREATE_USER_MUTATION = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
  
`;
export const DELETE_USER_MUTATION = gql`
mutation deleteUser($id: Int!){
    deleteUser(id: $id){
        id
    }
}
`
export const UPDATE_USER_MUTATION = gql`
mutation updateUser($data: UserCreateInput! $id: Int!){
    updateUser(data: $data id:$id){
        id
    }
}
`
