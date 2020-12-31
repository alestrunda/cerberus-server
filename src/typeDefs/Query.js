import { gql } from "apollo-server-express";

export default gql`
  type Query {
    backgroundRandom: String
    backgrounds: [String]
    debt(_id: String): Debt
    debts: [Debt]
    income(_id: String): Income
    incomes(year: Int): [Income]
    expense(_id: String): Expense
    expenses(year: Int): [Expense]
    subjects: [Subject]
    tags: [Tag]
  }
`;
