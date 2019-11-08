import Outlay from "../../models/Outlay";
import Subject from "../../models/Subject";
import Tag from "../../models/Tag";
import { fillRecordSubject, fillRecordTags, setUpRecordDate } from "../../misc";

export default {
  outlay: async (root, { _id }, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const record = await Outlay.findOne({ _id }).lean();
    return await await fillRecordTags(
      await fillRecordSubject(setUpRecordDate(record), Subject, selections),
      Tag,
      selections
    );
  },
  outlays: async (parent, args, context, info) => {
    const selections = info.fieldNodes[0].selectionSet.selections;
    const results = await Outlay.find({}).lean();
    const records = results
      .map(
        async record =>
          await fillRecordTags(
            await fillRecordSubject(
              setUpRecordDate(record),
              Subject,
              selections
            ),
            Tag,
            selections
          )
      )
      .sort((a, b) => a.date - b.date);
    return Promise.all(records).then(data => {
      return data.sort((a, b) => b.date - a.date);
    });
  }
};
