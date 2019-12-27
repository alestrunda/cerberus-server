import mongoose from "mongoose";

const Schema = mongoose.Schema;
const OutlaySchema = new Schema({
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  description: String,
  lastUpdate: { type: Date, default: Date.now },
  subjectID: { type: Schema.Types.ObjectId, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true }]
});

export default mongoose.model("outlay", OutlaySchema);
