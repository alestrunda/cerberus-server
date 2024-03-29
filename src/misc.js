import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import redis from "./redis";

export const isSelectionInQuery = (selections, fieldName) => {
  if (!selections) return false;
  return selections.findIndex((item) => item.name.value === fieldName) !== -1;
};

export const fillRecordSubject = async (
  record,
  subjectModel,
  querySelections
) => {
  if (querySelections && !isSelectionInQuery(querySelections, "subject")) {
    //do not fill subject if that field is not in the query
    return record;
  }
  const redisClient = redis.getClient();
  let subject = await redisClient.get(record.subjectID.toString());
  if (subject) subject = JSON.parse(subject);
  else {
    subject = await subjectModel.findOne({ _id: record.subjectID });
    redisClient.set(record.subjectID.toString(), JSON.stringify(subject));
  }
  const newRecord = {
    ...record,
    subject,
  };
  delete newRecord.subjectID;
  return newRecord;
};

export const fillRecordTags = (record, tagModel, querySelections) => {
  if (!record || !record.tags) {
    return record;
  }
  if (querySelections && !isSelectionInQuery(querySelections, "tags")) {
    //do not fill tags if that field is not in the query
    return record;
  }
  const redisClient = redis.getClient();
  return {
    ...record,
    tags: record.tags.map(async (tagID) => {
      let tag = await redisClient.get(tagID.toString());
      if (tag) tag = JSON.parse(tag);
      else {
        tag = await tagModel.findOne({ _id: tagID });
        redisClient.set(tagID.toString(), JSON.stringify(tag));
      }
      return tag;
    }),
  };
};

export const fillRecordDebt = async (
  record,
  debtModel,
  subjectModel,
  querySelections
) => {
  if (!record.debtID) {
    return record;
  }
  if (querySelections && !isSelectionInQuery(querySelections, "debt")) {
    //do not fill debt if that field is not in the query
    return record;
  }
  const debt = await debtModel.findOne({ _id: record.debtID });
  const debtFilled = await fillRecordSubject(
    debt.toObject(),
    subjectModel,
    querySelections
  );
  return {
    ...record,
    debt: debtFilled,
  };
};

export const setUpRecordDates = (record) => {
  if (!record) return record;
  return {
    ...record,
    date: new Date(record.date).getTime(),
    lastUpdate: record.lastUpdate
      ? new Date(record.lastUpdate).getTime()
      : null,
  };
};

export const filterByYear = (records, year) => {
  if (!year) return records;
  return records.filter(
    (record) => new Date(record.date).getFullYear() === year
  );
};

export const getSubject = async (ID, model) => {
  return await model.findOne({ _id: mongoose.Types.ObjectId(ID) });
};

export const removePaymentRecord = async (args, recordModel, paymentName) => {
  const record = await recordModel.findOne({ _id: args._id });
  if (!record) {
    //error that will be shown in graphql
    throw new UserInputError(`No ${paymentName} found with ID: ${args._id}`);
  }
  record.remove();
  return record;
};

export const createPaymentRecord = async (args, recordModel, subjectModel) => {
  const subject = await getSubject(args.subjectID, subjectModel);
  if (!subject) {
    //error that will be shown in graphql
    throw new UserInputError(`No subject found with ID: ${args.subjectID}`);
  }
  const newRecord = new recordModel({
    ...args,
    subjectID: subject._id,
  });
  await newRecord.save();
  return await fillRecordSubject(
    setUpRecordDates(newRecord.toObject()),
    subjectModel
  );
};

export const editPaymentRecord = async (
  args,
  recordModel,
  subjectModel,
  paymentName = "payment"
) => {
  const record = await recordModel.findOne({ _id: args._id });
  if (!record) {
    //error that will be shown in graphql
    throw new UserInputError(`No ${paymentName} found with ID: ${args._id}`);
  }
  for (let field in args) {
    if (field === "_id" || field === "__v") {
      continue;
    }
    record[field] = args[field];
  }
  record.lastUpdate = new Date();
  await record.save();
  return await fillRecordSubject(
    setUpRecordDates(record.toObject()),
    subjectModel
  );
};
