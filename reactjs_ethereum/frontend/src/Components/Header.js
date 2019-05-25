// Header.js
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <a href="#" className="logo">
          <span className="logo-mini"><b>A</b>LT</span>
          <span className="logo-lg">{this.props.appName}</span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown messages-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-envelope-o"></i>
                  <span className="label label-success">4</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">network </li>
                  <li>
                    <ul className="menu">
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                          </div>
                          network : {this.props.network}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}