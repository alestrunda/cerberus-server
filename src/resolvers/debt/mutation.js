import Debt from "../../models/Debt";
import Subject from "../../models/Subject";
import {
  createPaymentRecord,
  editPaymentRecord,
  removePaymentRecord
} from "../../misc";
import { PAYMENT_NAME } from "../../constants";

export default {
  createDebt: async (root, args, context, info) => {
    return await createPaymentRecord(args, Debt, Subject);
  },
  editDebt: async (root, args, context, info) => {
    return await editPaymentRecord(args, Debt, Subject, PAYMENT_NAME.DEBT);
  },
  removeDebt: async (root, args, context, info) => {
    return await removePaymentRecord(args, Debt, PAYMENT_NAME.DEBT);
  }
};
