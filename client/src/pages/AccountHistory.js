import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { FaDollarSign, FaHome, FaUserAlt } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Avatar from "react-avatar";
import { getAccount } from "../requests/accounts";
import { getTransactionsOfAccount } from "../requests/transactions";
import moment from "moment";

const AccountHistory = () => {
  const { accountId } = useParams();
  const [accountInfoStatus, setAccountInfoStatus] = useState({
    loaded: false,
    loading: false,
    status: null,
  });
  const [accountTransactionStatus, setAccountTransactionStatus] = useState({
    loaded: false,
    loading: false,
    status: null,
  });
  const [accountInfo, setAccountInfo] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState(null);

  useEffect(() => {
    (async () => {
      setAccountInfoStatus({ loading: true, loaded: false, status: null });
      const response = await getAccount(accountId);
      setAccountInfo(response.data.account);
      setAccountInfoStatus({
        loading: false,
        loaded: true,
        status: response.status,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setAccountTransactionStatus({
        loading: true,
        loaded: false,
        status: null,
      });
      const response = await getTransactionsOfAccount(accountId);
      console.log(response.data);
      setTransactionInfo(response.data.transactions);
      setAccountTransactionStatus({
        loading: false,
        loaded: true,
        status: response.status,
      });
    })();
  }, []);

  return (
    <div className="accountHistory">
      <div className="accounts__heading">Account Information</div>
      <div className="accountHistory__information">
        <div className="account__information">
          {accountInfo && (
            <div className="account__information-card">
              <Card>
                <Avatar
                  name={accountInfo.name}
                  className="account__information-avatar"
                  round={true}
                />
                <CardBody>
                  <CardTitle tag="h5" className="account__information-name">
                    {accountInfo.name}
                  </CardTitle>
                  <CardSubtitle
                    tag="h6"
                    className="mb-2 text-muted font-weight-normal account__information-email">
                    {accountInfo.email}
                  </CardSubtitle>
                  <p className="account__information-balance">
                    Account Balance: ${accountInfo.accountBalance}
                  </p>
                  <div className="account__information-links">
                    <NavLink
                      to={`/transfer/${accountInfo._id}`}
                      className="btn btn-primary btn-block d-flex align-items-center justify-content-center">
                      <FaDollarSign className="mr-1" />
                      Transfer Money
                    </NavLink>
                    <NavLink
                      to="/accounts"
                      className="btn btn-danger btn-block d-flex align-items-center justify-content-center">
                      <FaUserAlt className="mr-2" />
                      Back to accounts
                    </NavLink>
                    <NavLink
                      to="/"
                      className="btn btn-success btn-block d-flex align-items-center justify-content-center">
                      <FaHome className="mr-2" />
                      Back to Home
                    </NavLink>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
        <div className="transaction__information">
          {transactionInfo && (
            <div className="transaction__information-card">
              <Card>
                <CardTitle
                  tag="h5"
                  className="transaction__information-heading">
                  Recent transactions
                </CardTitle>
                {transactionInfo.length > 0 && (
                  <ListGroup className="transaction__information-list">
                    {transactionInfo.map((transaction) => (
                      <ListGroupItem key={transaction._id}>
                        <div className="transaction__information-info">
                          <div className="transaction__information-info--header">
                            <ListGroupItemHeading>
                              Transaction ID: <span>{transaction._id}</span>
                            </ListGroupItemHeading>
                            <small className="text-muted font-italic">
                              transacted{" "}
                              {moment(transaction.timestamp).fromNow()}
                            </small>
                          </div>
                          <div className="transaction__information-info--body">
                            <ListGroupItemText>
                              {transaction.sender === accountId
                                ? "Sent "
                                : "Received "}
                              <span
                                className={`transaction__information-info--bodyAmount font-weight-bold ${
                                  transaction.sender === accountId
                                    ? "text-danger"
                                    : "text-success"
                                }`}>
                                ${transaction.amount}
                              </span>
                              {transaction.sender === accountId
                                ? " to "
                                : " from "}
                              <NavLink
                                to={`/accounts/${
                                  transaction.receiver === accountId
                                    ? transaction.sender
                                    : transaction.receiver
                                }`}
                                className="transaction__information-info--bodyAccount">
                                {transaction.receiver === accountId
                                  ? transaction.senderName
                                  : transaction.receiverName}
                              </NavLink>{" "}
                              on{" "}
                              {moment(transaction.timestamp).format(
                                "Do MMMM, YYYY hh:mm A"
                              )}
                              .
                            </ListGroupItemText>
                            {transaction.remark && (
                              <p className="transaction__information-info--bodyRemark">
                                Note: "<span>{transaction.remark}</span>"
                              </p>
                            )}
                          </div>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
                {transactionInfo.length === 0 && (
                  <div className="result">
                    <p className="font-weight-bold form-control-lg">
                      There are no recent transactions for this account!
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;
