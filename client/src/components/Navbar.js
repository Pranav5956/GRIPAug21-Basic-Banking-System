import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import React, { useState } from "react";

import { NavLink as Link } from "react-router-dom";

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          BankWithMe
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/accounts" activeClassName="active">
                Accounts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/transfer" activeClassName="active">
                Transfer Money
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/" className="socialLink">
                <FaLinkedin />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" className="socialLink">
                <FaGithub />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" className="socialLink">
                <FaFacebook />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
