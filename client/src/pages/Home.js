import { NavLink } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div class="home">
      <NavLink to="/accounts">View accounts</NavLink>
      <NavLink to="/transfer">Transfer money</NavLink>
    </div>
  );
};

export default Home;
