import * as React from 'react';
import PropTypes from 'prop-types';

class PageTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return (
        <div>
          {children}
        </div>
    );
  }
}

PageTemplate.propTypes = {
  children: PropTypes.object,
};

export default PageTemplate;
