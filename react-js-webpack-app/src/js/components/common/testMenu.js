import * as React from 'react';
import { Link } from 'react-router-dom';

const TestMenu = () =>
  <nav className="navbar navbar-expand my-2">
    <div className="navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to='/testing-zone' className='nav-link' activeClassName='active'>
            Testing Zone
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/api' className='nav-link' activeClassName='active'>
            Api
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/clock' className='nav-link' activeClassName='active'>
            Clock
          </Link>
        </li>
      </ul>
    </div>
  </nav>;

export default TestMenu;
