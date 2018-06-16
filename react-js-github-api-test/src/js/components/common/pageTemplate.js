// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import MainMenu from './mainMenu';

type Props = {
  children: React.Node,
};

class PageTemplate extends React.PureComponent<Props> {
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

export default PageTemplate;
