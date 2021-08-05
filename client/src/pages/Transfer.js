import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAccount, getAllAccounts } from "../requests/accounts";

import Avatar from "react-avatar";
import { makeTransaction } from "../requests/transactions";

const Transfer = () => {
  const { accountId } = useParams();
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [selectedSender, setSelectedSender] = useState(accountId);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [senderStatus, setSenderStatus] = useState({
    loading: false,
    loaded: false,
  });
  const [receiverStatus, setReceiverStatus] = useState({
    loading: false,
    loaded: false,
  });
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState(1);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const accounts = await getAllAccounts();
      if (accounts.status === 200) setAccounts(accounts.data.accounts);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedSender) {
        setSender(null);
        setSenderStatus({ loading: true, loaded: false });
        const sender = await getAccount(selectedSender);
        if (sender.status === 200) setSender(sender.data.account);
        setSenderStatus({ loading: false, loaded: true });
      } else {
        setSender(null);
        setSenderStatus({ loading: false, loaded: false });
      }
    })();
  }, [selectedSender]);

  useEffect(() => {
    (async () => {
      if (selectedReceiver) {
        setReceiver(null);
        setReceiverStatus({ loading: true, loaded: false });
        const receiver = await getAccount(selectedReceiver);
        if (receiver.status === 200) setReceiver(receiver.data.account);
        setReceiverStatus({ loading: false, loaded: true });
      } else {
        setReceiver(null);
        setReceiverStatus({ loading: false, loaded: false });
      }
    })();
  }, [selectedReceiver]);

  useEffect(() => {
    if (message?.text) {
      setTimeout(() => setMessage(null), 5000);
    }
  }, [message]);

  const handleSenderSelect = (event) => {
    if (selectedSender !== event.target.value)
      setSelectedSender(event.target.value);
  };
  const handleReceiverSelect = (event) => {
    if (selectedReceiver !== event.target.value)
      setSelectedReceiver(event.target.value);
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setMessage(null);
    if (!selectedReceiver) {
      setMessage({
        text: "Please select a receiver account!",
        status: "danger",
      });
      return;
    }
    if (!selectedSender) {
      setMessage({
        text: "Please select a sender account!",
        status: "danger",
      });
      return;
    }
    if (amount > sender.accountBalance) {
      setMessage({
        text: "Amount exceeding current balance of sender!",
        status: "danger",
      });
      return;
    }
    setIsTransactionLoading(true);
    const transaction = await makeTransaction(
      selectedSender,
      selectedReceiver,
      amount,
      note
    );
    if (transaction.status === 200) {
      setMessage({ text: "Transaction successful!", status: "success" });
      if (!accountId) setSelectedSender(null);
      setSelectedReceiver(null);
      setAmount(1);
      setNote("");
    } else setMessage({ text: transaction.data.message, status: "danger" });
    setIsTransactionLoading(false);
  };

  return (
    <div class="transfer">
      <h2 className="transfer__heading">Transactions made easier!</h2>
      <Form>
        <section className="accountStatus">
          <div className="account__card">
            <Card>
              {sender && (
                <Avatar
                  name={sender?.name || ""}
                  className="account__picture"
                  round={true}
                />
              )}
              <CardBody>
                {sender && (
                  <>
                    <CardTitle tag="h5">{sender.name}</CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted font-weight-normal">
                      {sender.email}
                    </CardSubtitle>
                    <CardText className="mt-4">
                      Account Balance: ${sender.accountBalance.toFixed(2)}
                    </CardText>
                  </>
                )}
                {!sender && !senderStatus.loaded && !senderStatus.loading && (
                  <span className="account__helper">
                    Please select an account!
                  </span>
                )}
                {!sender && senderStatus.loading && (
                  <span className="account__helper">
                    <Spinner />
                  </span>
                )}
              </CardBody>
            </Card>
          </div>
          <div className="account__money">
            {selectedReceiver && selectedSender && (
              <>
                <h5 className="text-center">Amount</h5>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"> $ </InputGroupAddon>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(event) => {
                      if (event.target.value === "") event.target.value = 1;
                      setAmount(Math.max(event.target.value, 1));
                    }}
                    min={1}
                  />
                </InputGroup>
                <FormText className="text-center">Minimum Amount = $1</FormText>
              </>
            )}
          </div>
          <div className="account__card">
            <Card>
              {receiver && (
                <Avatar
                  name={receiver?.name || ""}
                  className="account__picture"
                  round={true}
                />
              )}
              <CardBody>
                {receiver && (
                  <>
                    <CardTitle tag="h5">{receiver.name}</CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted font-weight-normal">
                      {receiver.email}
                    </CardSubtitle>
                    <CardText className="mt-3">
                      Account Balance: ${receiver.accountBalance.toFixed(2)}
                    </CardText>
                  </>
                )}
                {!receiver &&
                  !receiverStatus.loaded &&
                  !receiverStatus.loading && (
                    <span className="account__helper">
                      Please select an account!
                    </span>
                  )}
                {!receiver && receiverStatus.loading && (
                  <span className="account__helper">
                    <Spinner />
                  </span>
                )}
              </CardBody>
            </Card>
          </div>
        </section>
        <section className="transferStatus">
          <FormGroup row>
            <Col className="mr-5">
              <h5>Choose sender account</h5>
              <Input
                type="select"
                disabled={!!accountId}
                onChange={handleSenderSelect}
                value={selectedSender || ""}>
                <option value="">--Choose sender--</option>
                {accounts &&
                  accounts
                    .filter((account) => account._id !== selectedReceiver)
                    .map((account) => (
                      <option value={account._id}>{account.name}</option>
                    ))}
              </Input>
            </Col>
            <Col className="ml-5">
              <h5>Choose receiver account</h5>
              <Input
                type="select"
                onChange={handleReceiverSelect}
                value={selectedReceiver || ""}>
                <option value="">--Choose receiver--</option>
                {accounts &&
                  accounts
                    .filter((account) => account._id !== selectedSender)
                    .map((account) => (
                      <option value={account._id}>{account.name}</option>
                    ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <h5 className="mt-2">Enter a note (optional)</h5>
              <Input
                type="text"
                maxLength={200}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </Col>
          </FormGroup>
          <Alert
            color={message?.status}
            className="text-center"
            isOpen={!!message}
            toggle={() => setMessage(null)}>
            {message?.text}
          </Alert>
          <FormGroup row>
            <Button
              onClick={handleOnSubmit}
              disabled={
                !selectedReceiver || !selectedSender || isTransactionLoading
              }
              color="primary"
              block
              className="transfer__button"
              size="lg">
              {isTransactionLoading && <Spinner />}
              Transfer
            </Button>
          </FormGroup>
        </section>
      </Form>
    </div>
  );
};

export default Transfer;
