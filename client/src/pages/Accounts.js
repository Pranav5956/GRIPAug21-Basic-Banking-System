import { FaAccessibleIcon, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { getAllAccounts } from "../requests/accounts";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    loaded: false,
    status: null,
    message: "",
  });

  useEffect(() => {
    (async () => {
      setRequestStatus({
        loading: true,
        loaded: false,
        status: null,
        message: "",
      });
      const accounts = await getAllAccounts();
      setAccounts(accounts.data.accounts);
      setRequestStatus({
        loading: false,
        loaded: true,
        status: accounts.status,
        message: accounts.data.message,
      });
    })();
  }, []);

  return (
    <div className="accounts">
      <h2 className="accounts__heading">Account Information</h2>
      {requestStatus.loading && !requestStatus.loaded && (
        <div className="loader">Loading...</div>
      )}
      {!requestStatus.loading &&
        requestStatus.loaded &&
        requestStatus.status !== 200 && (
          <div className="result">No results found!</div>
        )}
      {!requestStatus.loading &&
        requestStatus.loaded &&
        requestStatus.status === 200 && (
          <div className="accountInfo__container">
            {accounts.map((account) => (
              <div className="accountInfo" key={account._id}>
                <h4 className="accountInfo__name">{account.name}</h4>
                <p className="accountInfo__email">
                  <FaEnvelope aria-hidden="true" /> {account.email}
                </p>
                <div className="accountInfo__buttons">
                  <NavLink
                    to={`transfer/${account._id}`}
                    className="accountInfo__transaction--button button">
                    Make Transaction
                  </NavLink>
                  <NavLink
                    to={`transactions/${account._id}`}
                    className="accountInfo__history--button button">
                    View account history
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      <div className="accountsToHome">
        <NavLink to="/" className="accountsToHome">
          <FaArrowLeft /> Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Accounts;
