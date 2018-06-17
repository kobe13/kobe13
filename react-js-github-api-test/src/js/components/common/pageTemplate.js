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
        <h1>
          <NavLink title="HomePage" to="/" activeClassName="">
            {' '}
            GitHub API App
          </NavLink>
        </h1>
        <MainMenu />
        {children}
      </div>
    );
  }
}

export default PageTemplate;
