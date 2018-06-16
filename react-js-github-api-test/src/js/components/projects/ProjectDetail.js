// @flow
import React from 'react';

type ProjectDetailProps = {
  name: string,
  description: string,
  language: string,
  homepage: string,
  id: string,
};

type ProjectViewProps = {
  projects: ProjectDetailProps[],
};

const ProjectDetail = ({
  name,
  description,
  language,
  homepage,
}: ProjectDetailProps) => (
  <div>
    <h2>
      {homepage ? (
        <a href={homepage} title="Project homepage">
          {name}
        </a>
      ) : (
        name
      )}
    </h2>
    <p>{description}</p>
    {language && (
      <p>
        <i>
          <b>Language</b>: {language}
        </i>
      </p>
    )}
  </div>
);

const ProjectView = (props: ProjectViewProps) => (
  <div>
    {props.projects.map(project => (
      <ProjectDetail key={project.id} {...project} />
    ))}
  </div>
);

export default ProjectView;
