import { gql } from "apollo-server-express";

export default gql`
  type Tag {
    _id: ID
    name: String
  }
`;
