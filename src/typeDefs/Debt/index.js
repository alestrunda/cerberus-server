import { gql } from "apollo-server-express";

export default gql`
  type Debt {
    _id: ID
    amount: Float
    date: Float
    description: String
    hours: Float
    isPaid: Boolean
    lastUpdate: Float
    partial: Float
    subject: Subject
    tags: [Tag]
  }
`;
