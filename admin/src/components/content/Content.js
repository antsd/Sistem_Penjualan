import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";

import Profile from "../Profile";
import Signup from "../Register";
import BoardAdmin from "../../pages/BoardAdmin";
import BarangList from "../../pages/barang/BarangList";
import Barang from "../../pages/barang/Barang";
import AddBarang from "../../pages/barang/AddBarang";

import ProtectedRoute from "../../services/ProtectedRoute";
import CustomerList from "../../pages/customer/CustomerList";
import AddCustomer from "../../pages/customer/AddCustomer";
import Customer from "../../pages/customer/Customer";

import AllUserList from "../../pages/user/UserList";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <ProtectedRoute exact path='/' component={BoardAdmin} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/barang' component={BarangList} />
      <Route exact path='/barang/add' component={AddBarang} />
      <Route path='/barang/:id' component={Barang} />
      <Route exact path='/customer' component={CustomerList} />
      <Route exact path='/customer/add' component={AddCustomer} />
      <Route path='/customer/:id' component={Customer} />
      <Route exact path='/user' component={AllUserList} />
    </Switch>
  </Container>
);

export default Content;
