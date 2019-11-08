import { gql } from "apollo-server-express";
import {
  create as debtCreate,
  edit as debtEdit,
  remove as debtRemove
} from "./Debt/mutations";
import {
  create as incomeCreate,
  edit as incomeEdit,
  remove as incomeRemove
} from "./Income/mutations";
import {
  create as outlayCreate,
  edit as outlayEdit,
  remove as outlayRemove
} from "./Outlay/mutations";
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

    ${outlayCreate}
    ${outlayEdit}
    ${outlayRemove}

    ${subjectCreate}

    ${tagCreate}
  }
`;
