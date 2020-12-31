import Expense from "../../models/Expense";
import Subject from "../../models/Subject";
import {
  createPaymentRecord,
  editPaymentRecord,
  removePaymentRecord,
} from "../../misc";
import { PAYMENT_NAME } from "../../constants";

export default {
  createExpense: async (root, args, context, info) => {
    return await createPaymentRecord(args, Expense, Subject);
  },
  editExpense: async (root, args, context, info) => {
    return await editPaymentRecord(
      args,
      Expense,
      Subject,
      PAYMENT_NAME.EXPENSE
    );
  },
  removeExpense: async (root, args, context, info) => {
    return await removePaymentRecord(args, Expense, PAYMENT_NAME.EXPENSE);
  },
};
