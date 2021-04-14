import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./pages/BoardUser";
import BoardAdmin from "./pages/BoardAdmin";
import Home from "./pages/Home";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

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
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        {currentUser ? (
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
        ) : (
          <div></div>
        )}
      </nav>

      <div className='container mt-3'>
        <Switch>
          <Route exact path={"/"} component={BoardUser} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/user' component={BoardUser} />
          <Route path='/admin' component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
