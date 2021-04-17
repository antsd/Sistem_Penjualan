import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import { Switch, Route, Link } from "react-router-dom";

const BoardAdmin = (props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div class='container'>
      <div class='row'>
        <div class='col-lg-3 col-sm-6'>
          <div class='card-box bg-blue'>
            <div class='inner'>
              <h3> Data Barang </h3>
            </div>
            <div class='icon'>
              <i class='fa fa-dice-d6' aria-hidden='true'></i>
            </div>
            <a href='/barang' class='card-box-footer'>
              View More <i class='fa fa-arrow-circle-right'></i>
            </a>
          </div>
        </div>

        <div class='col-lg-3 col-sm-6'>
          <div class='card-box bg-green'>
            <div class='inner'>
              <h3> Data Customer </h3>
            </div>
            <div class='icon'>
              <i class='fa fa-building' aria-hidden='true'></i>
            </div>
            <a href='/customer' class='card-box-footer'>
              View More <i class='fa fa-arrow-circle-right'></i>
            </a>
          </div>
        </div>
        <div class='col-lg-3 col-sm-6'>
          <div class='card-box bg-orange'>
            <div class='inner'>
              <h3> Data User </h3>
            </div>
            <div class='icon'>
              <i class='fa fa-users' aria-hidden='true'></i>
            </div>
            <a href='/user' class='card-box-footer'>
              View More <i class='fa fa-arrow-circle-right'></i>
            </a>
          </div>
        </div>
        <div class='col-lg-3 col-sm-6'>
          <div class='card-box bg-red'>
            <div class='inner'>
              <h3> Data Transaksi </h3>
            </div>
            <div class='icon'>
              <i class='fa fa-copy'></i>
            </div>
            <a href='/transaksi' class='card-box-footer'>
              View More <i class='fa fa-arrow-circle-right'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
