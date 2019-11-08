import { gql } from "apollo-server-express";

export default gql`
  type Query {
    backgroundRandom: String
    backgrounds: [String]
    debt(_id: String): Debt
    debts: [Debt]
    income(_id: String): Income
    incomes: [Income]
    outlay(_id: String): Outlay
    outlays: [Outlay]
    subjects: [Subject]
    tags: [Tag]
  }
`;
