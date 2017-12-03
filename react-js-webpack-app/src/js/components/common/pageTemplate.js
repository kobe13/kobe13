import * as React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './mainMenu';

class PageTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return (
        <div>
          <MainMenu/>
          {children}
          <br/>
          <p>Work In Progress...</p>
        </div>
    );
  }
}

PageTemplate.propTypes = {
  children: PropTypes.object,
};

export default PageTemplate;
