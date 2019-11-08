import { gql } from "apollo-server-express";

export default gql`
  type Subject {
    _id: ID
    name: String
  }
`;
