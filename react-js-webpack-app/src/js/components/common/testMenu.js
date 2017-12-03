import * as React from 'react';
import { NavLink } from 'react-router-dom';

const TestMenu = () =>
        <nav className='sub-menu'>
            <NavLink to='/testing-zone' className='sub-menu__item' activeClassName='sub-menu__item--active'>
              Testing Zone
            </NavLink>
            <NavLink to='/clock' className='sub-menu__item' activeClassName='sub-menu__item--active'>
              Clock
            </NavLink>
        </nav>;

export default TestMenu;
