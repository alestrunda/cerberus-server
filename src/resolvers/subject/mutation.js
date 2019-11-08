import Subject from "../../models/Subject";
import { UserInputError } from "apollo-server-express";

export default {
  createSubject: async (root, args, context, info) => {
    const subject = await Subject.findOne({ name: args.name });
    if (subject) {
      //error that will be showed in graphql
      throw new UserInputError(`Subject with name ${args.name} already exists.`);
    }
    const newSubject = new Subject({
      ...args,
    });
    return newSubject.save();
  }
};
