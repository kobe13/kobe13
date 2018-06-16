// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';

const MainMenu = () => (
  <nav className="navbar-expand my-4">
    <div className="navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink title="HomePage" to="/" className="nav-link">
            <HomeIcon />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            title="Projects Page"
            to="/projects"
            className="nav-link"
            activeClassName="active"
          >
            PROJECTS
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default MainMenu;
