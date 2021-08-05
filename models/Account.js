import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  name: String,
  email: String,
  accountType: String,
  accountBalance: Number,
});

export default mongoose.model("accounts", accountSchema);
