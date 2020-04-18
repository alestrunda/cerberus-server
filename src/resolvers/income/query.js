import Debt from "../../models/Debt";
import Income from "../../models/Income";
import Subject from "../../models/Subject";
import Tag from "../../models/Tag";
import {
  fillRecordDebt,
  fillRecordSubject,
  fillRecordTags,
  filterByYear,
  setUpRecordDates,
} from "../../misc";
import { UserInputError } from "apollo-server-express";

export default {
  income: async (root, { _id }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const record = await Income.findOne({ _id }).lean();
    if (!record) throw new UserInputError(`No Income found with ID: ${_id}`);
    return await fillRecordTags(
      await fillRecordDebt(
        await fillRecordSubject(setUpRecordDates(record), Subject, selections),
        Debt,
        Subject,
        selections
      ),
      Tag,
      selections
    );
  },
  incomes: async (parent, { year }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const results = filterByYear(await Income.find({}).lean(), year);
    const records = results.map(
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
    );
    return Promise.all(records).then((data) => {
      return data.sort((a, b) => b.date - a.date);
    });
  },
};
