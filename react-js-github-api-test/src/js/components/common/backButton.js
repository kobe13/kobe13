// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  history: () => void,
};

class BackButton extends PureComponent<Props> {
  handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { history } = this.props;

    e.preventDefault();
    history.goBack();
  };

  render() {
    return (
      <button onClick={this.handleSubmit} id="back" className="btn btn-info">
        Back
      </button>
    );
  }
}

export default withRouter(BackButton);
