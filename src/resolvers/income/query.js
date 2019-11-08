import Debt from "../../models/Debt";
import Income from "../../models/Income";
import Subject from "../../models/Subject";
import Tag from "../../models/Tag";
import {
  fillRecordDebt,
  fillRecordSubject,
  fillRecordTags,
  setUpRecordDate
} from "../../misc";

export default {
  income: async (root, { _id }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const record = await Income.findOne({ _id }).lean();
    return await fillRecordTags(
      await fillRecordDebt(
        await fillRecordSubject(setUpRecordDate(record), Subject, selections),
        Debt,
        selections
      ),
      Tag,
      selections
    );
  },
  incomes: async (parent, args, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const results = await Income.find({}).lean();
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
