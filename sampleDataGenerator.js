import mongoose from "mongoose";
import dotenv from "dotenv";
import faker from "faker";
import DebtModel from "./src/models/Debt";
import IncomeModel from "./src/models/Income";
import OutlayModel from "./src/models/Outlay";
import SubjectModel from "./src/models/Subject";
import TagModel from "./src/models/Tag";

dotenv.config();

const DEBTS_CNT = 25;
const INCOMES_CNT = 65;
const OUTLAYS_CNT = 100;
const TAGS_CNT = 10;
const SUBJECTS_CNT = 30;
const MAX_YEARS_DIFFERENCE = 5;
const dateRange = [
  new Date(),
  new Date((new Date().getFullYear() - MAX_YEARS_DIFFERENCE).toString())
];

//connect to db
try {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log("Connection to database successfull");
  });
  mongoose.Promise = global.Promise; //set Mongoose to use the global promise library
  main();
} catch (e) {
  console.log("Cannot connect to database");
  process.exit(1);
}

/**
 * Shuffles array in place. ES6 version
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function saveRecords(records, RecordModel) {
  const promises = [];
  records.forEach(subject => {
    promises.push(RecordModel.create(subject));
  });
  return promises;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateSubject() {
  return {
    name: faker.name.findName()
  };
}

function generateTag() {
  //tags could be one or more word, likely just one word
  return {
    name: getRandomInt(3) < 2 ? faker.lorem.word() : faker.lorem.words()
  };
}

function generateRecords(count, recordFunc, ...args) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(recordFunc(...args));
  }
  return out;
}

function generatePayment(subjects, tags) {
  return {
    amount: faker.random.number(),
    date: faker.date.between(...dateRange),
    description: getDescription(),
    subjectID: subjects[getRandomInt(subjects.length)],
    tags: pickRandomItems(tags, 3)
  };
}

function getDescription() {
  switch (getRandomInt(3)) {
    case 0:
      return "";
    case 1:
      return faker.lorem.sentence();
    case 2:
      return faker.lorem.sentences();
  }
}

function pickRandomItems(array, upToCount) {
  if (upToCount === 0) return [];
  const items = shuffle([...array]);
  return items.splice(0, Math.min(array.length, getRandomInt(upToCount + 1)));
}

function generateDebt(subjects, tags) {
  return {
    ...generatePayment(subjects, tags),
    hours: faker.random.number(),
    isPaid: faker.random.boolean(),
    partial: faker.random.number()
  };
}

function generateIncome(subjects, tags, debtsID) {
  return {
    ...generatePayment(subjects, tags),
    debtID:
      getRandomInt(2) === 0 ? undefined : debtsID[getRandomInt(debtsID.length)] //50% chance for debtID do be set
  };
}

function generateOutlay(subjects, tags) {
  return generatePayment(subjects, tags);
}

function parseID(record) {
  return record._id;
}

async function main() {
  const subjects = generateRecords(SUBJECTS_CNT, generateSubject);
  await Promise.all(saveRecords(subjects, SubjectModel));
  const subjectsDb = await SubjectModel.find();
  const subjectsID = subjectsDb.map(parseID);
  console.log(`Created ${SUBJECTS_CNT} subjects.`);

  const tags = generateRecords(TAGS_CNT, generateTag);
  await Promise.all(saveRecords(tags, TagModel));
  const tagsDb = await TagModel.find();
  const tagsID = tagsDb.map(parseID);
  console.log(`Created ${TAGS_CNT} tags.`);

  const debts = generateRecords(DEBTS_CNT, generateDebt, subjectsID, tagsID);
  await Promise.all(saveRecords(debts, DebtModel));
  const debtsDb = await DebtModel.find();
  const debtsID = debtsDb.map(parseID);
  console.log(`Created ${DEBTS_CNT} debts.`);

  const incomes = generateRecords(
    INCOMES_CNT,
    generateIncome,
    subjectsID,
    tagsID,
    debtsID
  );
  await Promise.all(saveRecords(incomes, IncomeModel));
  console.log(`Created ${INCOMES_CNT} incomes.`);

  const outlays = generateRecords(
    OUTLAYS_CNT,
    generateOutlay,
    subjectsID,
    tagsID
  );
  await Promise.all(saveRecords(outlays, OutlayModel));
  console.log(`Created ${OUTLAYS_CNT} outlays.`);

  console.log("done");
}
