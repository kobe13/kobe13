import React from 'react';
import PropTypes from 'prop-types';

const Contributor = ({
  login, contributions,
}) => (
      <li>
        <i>{login} ({contributions} contributions)</i>
      </li>
);

const ContributorsList = props => (
  <div>
    <i>Contributors:</i>
    <ul>
      {props.contributors.map((contributor, index) => (
        <Contributor
          key={index}
          {...contributor}
        />
      ))}
    </ul>
  </div>
);

Contributor.propTypes = {
  login: PropTypes.string,
  contributions: PropTypes.string,
};

ContributorsList.propTypes = {
  contributors: PropTypes.array,
};

export default ContributorsList;
