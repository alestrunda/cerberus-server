import backgroundQueries from "./background/query";
import debtMutations from "./debt/mutation";
import debtQueries from "./debt/query";
import incomeMutations from "./income/mutation";
import incomeQueries from "./income/query";
import outlayMutations from "./outlay/mutation";
import outlayQueries from "./outlay/query";
import subjectQueries from "./subject/query";
import subjectMutations from "./subject/mutation";
import tagQueries from "./tag/query";
import tagMutations from "./tag/mutation";

export default {
  Query: {
    ...backgroundQueries,
    ...debtQueries,
    ...incomeQueries,
    ...outlayQueries,
    ...subjectQueries,
    ...tagQueries
  },
  Mutation: {
    ...debtMutations,
    ...incomeMutations,
    ...outlayMutations,
    ...subjectMutations,
    ...tagMutations
  }
};
