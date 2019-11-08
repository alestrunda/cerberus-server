export const create = `createOutlay(
  amount: Float
  date: Float
  description: String
  subjectID: String!
  tags: [String]
): Outlay`;

export const edit = `editOutlay(
  _id: String!
  amount: Float
  date: Float
  description: String
  subjectID: String!
  tags: [String]
): Outlay`;

export const remove = `removeOutlay(
  _id: String!
): Outlay`;
