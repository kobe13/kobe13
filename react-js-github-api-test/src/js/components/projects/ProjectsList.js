// @flow
import React from 'react';

type ProjectProps = {
  name: string,
  watchers: number,
  id: string,
  action: (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
    contributors_url: string
  ) => void,
  contributors_url: string,
};

type ProjectsListProps = {
  projects: ProjectProps[],
  number: number,
  action: () => void,
  org: string,
};

const Project = ({
  name,
  watchers,
  id,
  contributors_url,
  action,
}: ProjectProps) => (
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

const ProjectsList = (props: ProjectsListProps) => (
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

export default ProjectsList;
