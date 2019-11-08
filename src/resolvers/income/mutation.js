import Income from "../../models/Income";
import Subject from "../../models/Subject";
import {
  createPaymentRecord,
  editPaymentRecord,
  removePaymentRecord
} from "../../misc";
import { PAYMENT_NAME } from "../../constants";

export default {
  createIncome: async (root, args, context, info) => {
    return await createPaymentRecord(args, Income, Subject);
  },
  editIncome: async (root, args, context, info) => {
    return await editPaymentRecord(args, Income, Subject, PAYMENT_NAME.INCOME);
  },
  removeIncome: async (root, args, context, info) => {
    return await removePaymentRecord(args, Income, PAYMENT_NAME.INCOME);
  }
};
