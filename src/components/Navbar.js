import React from "react";
import logo from "../logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark">
      <a className="navbar-brand ml-5">
        <img src={logo} style={{ height: "40px" }}></img>
      </a>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              className="nav-link text-white text-uppercase ml-5"
              href="/densityMap"
            >
              Density Map <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-white text-uppercase ml-5"
              href="/diversityMap"
            >
              Diversity Map
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
