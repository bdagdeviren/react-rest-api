import React from 'react';
import './header.css';
import "react-sweet-progress/lib/style.css";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../img/cloud_fun.png"

class Header extends React.Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark">
          <div style={{width: "100%"}}>
            <div style={{width: "80%", margin: "0 auto"}}>
              <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' Npm-Maven Package Uploader'}
              </Navbar.Brand>
            </div>
          </div>
        </Navbar>
    )
  }
}

export default Header;
