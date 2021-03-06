import { gql } from "apollo-server-express";

export default gql`
  type Income {
    _id: ID
    amount: Float
    date: Float
    debt: Debt
    debtID: ID
    description: String
    lastUpdate: Float
    subject: Subject
    tags: [Tag]
  }
`;
