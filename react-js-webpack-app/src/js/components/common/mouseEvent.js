import * as React from 'react';
import PropTypes from 'prop-types';

// Render Props test
class MouseEvent extends React.Component {
  constructor() {
    super();

    // Initial state values
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  }

  render() {
    return (
      <div onMouseMove={e => this.handleMouseMove(e)}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

MouseEvent.propTypes = {
  render: PropTypes.func.isRequired,
};

export default MouseEvent;
