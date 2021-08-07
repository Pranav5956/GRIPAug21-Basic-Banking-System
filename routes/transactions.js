import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import express from "express";

const router = express.Router();

/*
  @route /transactions/
  @desc Get all transactions
  @method GET
*/
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
  @route /transactions/:transactionId
  @desc Get a particular transaction based on a transactionId
  @method GET
  @param transactionId: Transaction ID of the transaction to get all details of.
*/
router.get("/:transactionId", async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findOne({ _id: transactionId });
    res.json({ transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
  @route /transactions/:accountId
  @desc Get all transactions of a particular account.
  @method GET
  @param accountId: Account ID of the account to get all transactions of.
*/
router.get("/account/:accountId", async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const transactions = await Transaction.find({
      $or: [{ sender: accountId }, { receiver: accountId }],
    }).sort({ timestamp: -1 });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
  @route /transactions/
  @desc Make a transaction and store it.
  @method POST
*/
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, amount, remark } = req.body;
    const senderAccount = await Account.findOne(
      { _id: senderId },
      { name: 1, accountBalance: 1 }
    );
    const receiverAccount = await Account.findOne(
      { _id: receiverId },
      { name: 1, accountBalance: 1 }
    );

    if (!senderAccount || !receiverAccount)
      return res.status(400).json({ message: "Account(s) does not exist!" });

    // Check if balance exists in the sender's account
    if (amount < 0)
      return res
        .status(400)
        .json({ message: "Amount should be greater than 0!" });
    if (amount > senderAccount.accountBalance)
      return res.status(400).json({
        message: `Insufficient account balance! Remaining balance: Rs.${senderAccount.accountBalance}`,
      });

    // Update account balances
    await Account.findByIdAndUpdate(senderId, {
      $inc: { accountBalance: -amount },
    });
    await Account.findByIdAndUpdate(receiverId, {
      $inc: { accountBalance: amount },
    });

    // Store the transactions
    const transaction = new Transaction({
      sender: senderId,
      receiver: receiverId,
      senderName: senderAccount.name,
      receiverName: receiverAccount.name,
      amount,
      remark,
    });
    await transaction.save();

    res.json({ transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
