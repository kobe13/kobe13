import React from 'react';
import PropTypes from 'prop-types';

const Project = ({ name, watchers, id, contributors_url, action }) => (
  <button
    title="See project details"
    onClick={e => action(e, id, contributors_url)}
    className="btn btn-link"
  >
    <li className="list-group-item text-left">
      <h4>{name}</h4> <i>({watchers} watchers)</i>
    </li>
  </button>
);

const ProjectsList = props => (
  <div>
    {props.projects && (
      <h4>
        {props.org}
        {"'s"} Projects: {props.number}
      </h4>
    )}
    <ul className="list-group">
      {props.projects.map(project => (
        <Project key={project.id} {...project} action={props.action} />
      ))}
    </ul>
  </div>
);

Project.propTypes = {
  name: PropTypes.string,
  watchers: PropTypes.number,
  id: PropTypes.string,
  action: PropTypes.func,
  contributors_url: PropTypes.string,
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
  number: PropTypes.number,
  action: PropTypes.func,
  org: PropTypes.string,
};

export default ProjectsList;
