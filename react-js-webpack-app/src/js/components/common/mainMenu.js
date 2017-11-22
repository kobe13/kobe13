import * as React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';

const MainMenu = () =>
    <nav className='main-menu'>
      <NavLink to='/' className='main-menu__item' activeClassName='main-menu__item--active'>
        <HomeIcon/>
      </NavLink>
      <NavLink to='/test' className='main-menu__item' activeClassName='main-menu__item--active'>
        TEST ZONE
      </NavLink>
      <NavLink to='/about' className='main-menu__item' activeClassName='main-menu__item--active'>
        ABOUT
      </NavLink>
      <NavLink to='/contact' className='main-menu__item' activeClassName='main-menu__item--active'>
        CONTACT
      </NavLink>
    </nav>;

export default MainMenu;
