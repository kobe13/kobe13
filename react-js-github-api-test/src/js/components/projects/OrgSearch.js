import React from 'react';
import PropTypes from 'prop-types';

const OrgSearch = props => (
  <div>
    <h4>Load projects:</h4>
    <form onSubmit={props.submitAction}>
      <div className="input-group">
        <input
          name="orgName"
          className="form-control"
          type="text"
          value={props.orgName}
          onChange={props.onChangeAction}
          placeholder="Enter the org name. e.g. facebook, github, twitter..."
          required
        />
        <span className="input-group-btn">
          <button
            type="submit"
            value="Load projects"
            className="btn btn-primary">
            Go!
          </button>
        </span>
      </div>
    </form>
  </div>
);

OrgSearch.propTypes = {
  submitAction: PropTypes.func,
  orgName: PropTypes.string,
  onChangeAction: PropTypes.func,
};

export default OrgSearch;
