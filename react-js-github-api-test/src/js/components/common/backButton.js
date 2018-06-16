// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  history: () => void,
};

class BackButton extends PureComponent<Props> {
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
        Back
      </button>
    );
  }
}

export default withRouter(BackButton);
