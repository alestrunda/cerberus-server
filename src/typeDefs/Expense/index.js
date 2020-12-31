import { gql } from "apollo-server-express";

export default gql`
  type Expense {
    _id: ID
    amount: Float
    date: Float
    description: String
    lastUpdate: Float
    subject: Subject
    tags: [Tag]
  }
`;
