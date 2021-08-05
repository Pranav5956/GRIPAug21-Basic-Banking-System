import { NavLink, useParams } from "react-router-dom";

import React from "react";

const AccountHistory = () => {
  const { accountId } = useParams();

  return (
    <div class="accountHistory">
      <b>Account ID: {accountId}</b>
      <NavLink to="/accounts">Back to Accounts</NavLink>
    </div>
  );
};

export default AccountHistory;
