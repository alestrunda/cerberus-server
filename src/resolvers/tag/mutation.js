import Tag from "../../models/Tag";
import { UserInputError } from "apollo-server-express";

export default {
  createTag: async (root, args, context, info) => {
    console.log('asd');
    const tag = await Tag.findOne({ name: args.name });
    if (tag) {
      //error that will be showed in graphql
      throw new UserInputError(`Tag with name ${args.name} already exists.`);
    }
    const newTag = new Tag({
      ...args,
    });
    return newTag.save();
  }
};
