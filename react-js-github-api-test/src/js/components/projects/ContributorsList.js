// @flow
import React from 'react';

type ContributorProps = {
  login: string,
  contributions: string,
  id: string,
};

type ContributorsListProps = {
  contributors: ContributorProps[],
};

const Contributor = ({ login, contributions }: ContributorProps) => (
  <li>
    <i>
      {login} ({contributions} contributions)
    </i>
  </li>
);

const ContributorsList = (props: ContributorsListProps) => (
  <div>
    <b>Contributors:</b>
    <ul className="list-unstyled">
      {props.contributors.map(contributor => (
        <Contributor key={contributor.id} {...contributor} />
      ))}
    </ul>
  </div>
);

export default ContributorsList;
