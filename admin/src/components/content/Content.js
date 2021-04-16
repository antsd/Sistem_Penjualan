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

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path='/' component={BoardAdmin} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/barang' component={BarangList} />
      <Route exact path='/barang/add' component={AddBarang} />
      <Route path='/barang/:id' component={Barang} />
      <Route exact path='/Pages' component={() => "Pages"} />
      <Route exact path='/faq' component={() => "FAQ"} />
      <Route exact path='/contact' component={() => "Contact"} />
      <Route exact path='/Home-1' component={() => "Home-1"} />
      <Route exact path='/Home-2' component={() => "Home-2"} />
    </Switch>
  </Container>
);

export default Content;
