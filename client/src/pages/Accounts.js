import { Card, CardBody, CardSubtitle, CardTitle, Spinner } from "reactstrap";
import {
  FaAccessibleIcon,
  FaArrowLeft,
  FaBackward,
  FaDollarSign,
  FaEnvelope,
  FaHistory,
  FaInfo,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";

import Avatar from "react-avatar";
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
      <NavLink className="back__button" to="/">
        <FaArrowLeft className="mr-1" />
        Back to Home
      </NavLink>
      <h2 className="accounts__heading">Choose an account!</h2>
      {requestStatus.loading && !requestStatus.loaded && (
        <div className="result">
          <div className="loader">
            <Spinner />
            Loading...
          </div>
        </div>
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
                <Card>
                  <Avatar
                    name={account.name}
                    className="accountInfo__picture"
                    round={true}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{account.name}</CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted font-weight-normal">
                      {account.email}
                    </CardSubtitle>
                    <NavLink
                      to={`/transfer/${account._id}`}
                      className="btn btn-primary btn-block d-flex align-items-center justify-content-center">
                      <FaDollarSign className="mr-1" />
                      Transfer Money
                    </NavLink>
                    <NavLink
                      to={`/accounts/${account._id}`}
                      className="btn btn-danger btn-block d-flex align-items-center justify-content-center">
                      <FaInfo className="mr-1" />
                      View account details
                    </NavLink>
                  </CardBody>
                </Card>
                {/* <h4 className="accountInfo__name">{account.name}</h4>
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
                    to={`accounts/${account._id}`}
                    className="accountInfo__history--button button">
                    View account history
                  </NavLink>
                </div> */}
              </div>
            ))}
          </div>
        )}
      {/* <div className="accountsToHome">
        <NavLink to="/" className="accountsToHome">
          <FaArrowLeft /> Back to Home
        </NavLink>
      </div> */}
    </div>
  );
};

export default Accounts;
