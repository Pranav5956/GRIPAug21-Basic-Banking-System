import Account from "../models/Account.js";
import express from "express";

const router = express.Router();

/*
  @route /accounts/
  @desc Get all account details.
  @method GET
*/
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json({ accounts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
  @route /accounts/:accountId
  @desc Get account details of a single account.
  @method GET
  @param accountId: Account ID of the account to get all details of.
*/
router.get("/:accountId", async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findOne({ _id: accountId });
    res.json({ account });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
