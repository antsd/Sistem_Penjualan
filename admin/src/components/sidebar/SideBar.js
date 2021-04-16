import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "../../assets/PT Deemes.svg";
const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className='sidebar-header'>
      <span color='info' onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <img
        src={Logo}
        alt='PT Deemes'
        style={{ height: "100px", width: "250px" }}
      />
    </div>
    <div className='side-menu'>
      <Nav vertical className='list-unstyled pb-3'>
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            <FontAwesomeIcon icon={faHome} className='mr-2' />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/barang"}>
            <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
            Data Barang
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/customer"}>
            <FontAwesomeIcon icon={faImage} className='mr-2' />
            Data Customer
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/user"}>
            <FontAwesomeIcon icon={faQuestion} className='mr-2' />
            Data User
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/transaksi"}>
            <FontAwesomeIcon icon={faQuestion} className='mr-2' />
            Data Transaksi
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
