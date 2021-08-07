import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarText,
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
          <Nav className="ml-auto d-flex align-items-center" navbar>
            <NavItem>
              <NavbarText className="mr-5">Made by Pranav Balaji</NavbarText>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.linkedin.com/in/pranav-balaji"
                className="socialLink"
                target="_blank"
                rel="noopener noreferrer">
                <FaLinkedin />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://github.com/Pranav5956/GRIPAug21-Basic-Banking-System"
                className="socialLink"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.facebook.com/Pranav5956/"
                className="socialLink"
                target="_blank"
                rel="noopener noreferrer">
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
