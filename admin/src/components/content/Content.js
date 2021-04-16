import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";

import Profile from "../Profile";
import BoardAdmin from "../../pages/BoardAdmin";
import BarangList from "../../pages/BarangList";
import Barang from "../../pages/Barang";
import AddBarang from "../../pages/AddBarang";

import ProtectedRoute from "../../services/ProtectedRoute";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <ProtectedRoute exact path='/' component={BoardAdmin} />
      <ProtectedRoute exact path='/profile' component={Profile} />
      <ProtectedRoute exact path='/barang' component={BarangList} />
      <ProtectedRoute exact path='/barang/add' component={AddBarang} />
      <ProtectedRoute path='/barang/:id' component={Barang} />
    </Switch>
  </Container>
);

export default Content;
