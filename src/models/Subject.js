import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.model("subject", SubjectSchema);
