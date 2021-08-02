import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  senderName: String,
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  receiverName: String,
  amount: Number,
  remark: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("transactions", transactionSchema);
