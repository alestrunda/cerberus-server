import Tag from "../../models/Tag";

export default {
  tags: async () => {
    return await Tag.find({});
  }
};
