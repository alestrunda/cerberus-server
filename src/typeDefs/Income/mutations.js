export const create = `createIncome(
  amount: Float
  date: Float
  debtID: String
  description: String
  subjectID: String!
  tags: [String]
): Income`;

export const edit = `editIncome(
  _id: String!
  amount: Float
  date: Float
  debtID: String
  description: String
  subjectID: String!
  tags: [String]
): Income`;

export const remove = `removeIncome(
  _id: String!
): Income`;
