export const create = `createExpense(
  amount: Float
  date: Float
  description: String
  subjectID: String!
  tags: [String]
): Expense`;

export const edit = `editExpense(
  _id: String!
  amount: Float
  date: Float
  description: String
  subjectID: String!
  tags: [String]
): Expense`;

export const remove = `removeExpense(
  _id: String!
): Expense`;
