import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";

import Login from "../Login";
import Home from "../../pages/Home";
import Profile from "../Profile";
import BoardAdmin from "../../pages/BoardAdmin";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path='/' component={BoardAdmin} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/about' component={() => "About"} />
      <Route exact path='/Pages' component={() => "Pages"} />
      <Route exact path='/faq' component={() => "FAQ"} />
      <Route exact path='/contact' component={() => "Contact"} />
      <Route exact path='/Home-1' component={() => "Home-1"} />
      <Route exact path='/Home-2' component={() => "Home-2"} />
    </Switch>
  </Container>
);

export default Content;
