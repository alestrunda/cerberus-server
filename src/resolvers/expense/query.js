import Expense from "../../models/Expense";
import Subject from "../../models/Subject";
import Tag from "../../models/Tag";
import {
  fillRecordSubject,
  fillRecordTags,
  filterByYear,
  setUpRecordDates,
} from "../../misc";

export default {
  expense: async (root, { _id }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const record = await Expense.findOne({ _id }).lean();
    return await await fillRecordTags(
      await fillRecordSubject(setUpRecordDates(record), Subject, selections),
      Tag,
      selections
    );
  },
  expenses: async (parent, { year }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const results = filterByYear(await Expense.find({}).lean(), year);
    const records = results
      .map(
        async (record) =>
          await fillRecordTags(
            await fillRecordSubject(
              setUpRecordDates(record),
              Subject,
              selections
            ),
            Tag,
            selections
          )
      )
      .sort((a, b) => a.date - b.date);
    return Promise.all(records).then((data) => {
      return data.sort((a, b) => b.date - a.date);
    });
  },
};
