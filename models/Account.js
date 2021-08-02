import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  accountBalance: Number,
});

export default mongoose.model("accounts", accountSchema);
