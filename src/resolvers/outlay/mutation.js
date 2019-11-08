import Outlay from "../../models/Outlay";
import Subject from "../../models/Subject";
import {
  createPaymentRecord,
  editPaymentRecord,
  removePaymentRecord
} from "../../misc";
import { PAYMENT_NAME } from "../../constants";

export default {
  createOutlay: async (root, args, context, info) => {
    return await createPaymentRecord(args, Outlay, Subject);
  },
  editOutlay: async (root, args, context, info) => {
    return await editPaymentRecord(args, Outlay, Subject, PAYMENT_NAME.OUTLAY);
  },
  removeOutlay: async (root, args, context, info) => {
    return await removePaymentRecord(args, Outlay, PAYMENT_NAME.OUTLAY);
  }
};
