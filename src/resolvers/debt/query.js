import Debt from "../../models/Debt";
import Subject from "../../models/Subject";
import Tag from "../../models/Tag";
import { fillRecordSubject, fillRecordTags, setUpRecordDate } from "../../misc";

export default {
  debt: async (root, { _id }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const record = await Debt.findOne({ _id }).lean();
    return await fillRecordTags(
      await fillRecordSubject(setUpRecordDate(record), Subject, selections),
      Tag, selections
    );
  },
  debts: async (parent, args, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const results = await Debt.find({}).lean();
    const records = results.map(
      async record =>
        await fillRecordTags(
          await fillRecordSubject(setUpRecordDate(record), Subject, selections),
          Tag,
          selections
        )
    );
    return Promise.all(records).then(data => {
      return data.sort((a, b) => b.date - a.date);
    });
  }
};
