import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DebtSchema = new Schema({
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  description: String,
  hours: { type: Number, default: 0 },
  isPaid: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: Date.now },
  partial: { type: Number, default: 0 },
  subjectID: { type: Schema.Types.ObjectId, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true }]
});

export default mongoose.model("debt", DebtSchema);
