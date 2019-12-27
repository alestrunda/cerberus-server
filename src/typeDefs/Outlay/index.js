import { gql } from "apollo-server-express";

export default gql`
  type Outlay {
    _id: ID
    amount: Float
    date: Float
    description: String
    lastUpdate: Float
    subject: Subject
    tags: [Tag]
  }
`;
