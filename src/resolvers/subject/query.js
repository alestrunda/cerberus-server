import Subject from "../../models/Subject";

export default {
  subjects: async () => {
    return await Subject.find({});
  }
};
