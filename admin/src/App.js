import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from "./assets/PT Deemes.svg";

import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./pages/BoardAdmin";

const App = () => {
  //sidebar
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <div className='App wrapper'>
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </Switch>
  );
};

export default App;
