import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PageTemplate extends PureComponent {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

PageTemplate.propTypes = {
  children: PropTypes.object,
};

export default PageTemplate;
