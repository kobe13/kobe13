import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import MainMenu from './mainMenu';

class PageTemplate extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        <NavLink title="HomePage" to="/" activeClassName="">
          {' '}
          <h1>GitHub API Test</h1>
        </NavLink>
        <MainMenu />
        {children}
      </div>
    );
  }
}

PageTemplate.propTypes = {
  children: PropTypes.object,
};

export default PageTemplate;
