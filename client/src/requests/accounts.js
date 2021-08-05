import axios from "axios";

export const getAllAccounts = () => axios.get("/api/accounts");

export const getAccount = (accountId) =>
  axios.get(`/api/accounts/${accountId}`);
