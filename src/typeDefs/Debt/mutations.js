export const create = `createDebt(
  amount: Float
  date: Float
  description: String
  hours: Float
  isPaid: Boolean
  partial: Float
  subjectID: String!
  tags: [String]
): Debt`;

export const edit = `editDebt(
  _id: String!
  amount: Float
  date: Float
  description: String
  hours: Float
  isPaid: Boolean
  partial: Float
  subjectID: String!
  tags: [String]
): Debt`;

export const remove = `removeDebt(
  _id: String!
): Debt`;
