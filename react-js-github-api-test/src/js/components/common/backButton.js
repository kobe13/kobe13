import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
  handleSubmit(e) {
    const { history } = this.props;

    e.preventDefault();
    history.goBack();
  }

  render() {
    return (
      <button
        onClick={e => this.handleSubmit(e)}
        id="back"
        className="btn btn-info"
      >
        Back to users
      </button>
    );
  }
}

BackButton.propTypes = {
  history: PropTypes.func.isRequired,
};

export default withRouter(BackButton);
