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
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  //sidebar
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      {currentUser ? (
        <nav
          className='navbar navbar-expand navbar-light navbar1'
          style={{ backgroundColor: "#E8F0FE" }}
        >
          <Link to={"/"}>
            <img className='logoNav' src={Logo} alt='Logo' />
          </Link>
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={"/profile"} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        </nav>
      ) : (
        <div></div>
      )}

      <div className='container mt-3'>
        <Switch>
          <Route exact path={["/", "/admin"]} component={BoardAdmin} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
