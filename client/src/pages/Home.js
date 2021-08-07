import AccountsImage from "../assets/accounts.svg";
import { NavLink } from "react-router-dom";
import React from "react";
import TransactionImage from "../assets/transaction.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="accounts__heading">Banking Made Easy!</div>
      <div className="home__links">
        <NavLink to="/accounts" style={{ textDecoration: "none" }}>
          <div className="icon">
            <img src={AccountsImage} />
          </div>
          <p>View accounts</p>
        </NavLink>
        <NavLink to="/transfer" style={{ textDecoration: "none" }}>
          <div className="icon">
            <img src={TransactionImage} />
          </div>
          <p>Transfer Money</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
