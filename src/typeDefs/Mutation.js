import { gql } from "apollo-server-express";
import {
  create as debtCreate,
  edit as debtEdit,
  remove as debtRemove,
} from "./Debt/mutations";
import {
  create as incomeCreate,
  edit as incomeEdit,
  remove as incomeRemove,
} from "./Income/mutations";
import {
  create as expenseCreate,
  edit as expenseEdit,
  remove as expenseRemove,
} from "./Expense/mutations";
import { create as subjectCreate } from "./Subject/mutations";
import { create as tagCreate } from "./Tag/mutations";

export default gql`
  type Mutation {
    ${debtCreate}
    ${debtEdit}
    ${debtRemove}

    ${incomeCreate}
    ${incomeEdit}
    ${incomeRemove}

    ${expenseCreate}
    ${expenseEdit}
    ${expenseRemove}

    ${subjectCreate}

    ${tagCreate}
  }
`;
