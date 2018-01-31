import * as React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';

const MainMenu = () =>
  <nav className="navbar-expand my-4">
    <div className="navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to='/' className='nav-link' activeClassName='active'>
            <HomeIcon/>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/test' className='nav-link' activeClassName='active'>
            TEST ZONE
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/blog' className='nav-link' activeClassName='active'>
            BLOG
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/contact' className='nav-link' activeClassName='active'>
            CONTACT
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>;

export default MainMenu;
