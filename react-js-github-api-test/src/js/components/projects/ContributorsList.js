import React from 'react';
import PropTypes from 'prop-types';

const Contributor = ({ login, contributions }) => (
  <li>
    <i>
      {login} ({contributions} contributions)
    </i>
  </li>
);

const ContributorsList = props => (
  <div>
    <b>Contributors:</b>
    <ul className="list-unstyled">
      {props.contributors.map(contributor => (
        <Contributor key={contributor.id} {...contributor} />
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
