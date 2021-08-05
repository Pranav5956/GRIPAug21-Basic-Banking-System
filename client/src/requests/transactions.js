import axios from "axios";

export const getAllTransactions = () => axios.get("/api/transactions");

export const getTransaction = (transactionId) =>
  axios.get(`/api/transactions/${transactionId}`);

export const getTransactionsOfAccount = (accountId) =>
  axios.get(`/api/transactions/account/${accountId}`);

export const makeTransaction = (senderId, receiverId, amount, remark) =>
  axios.post("/api/transactions", {
    senderId,
    receiverId,
    amount,
    remark,
  });
