import React from 'react';
import PropTypes from 'prop-types';

const ProjectDetail = ({ name, description, language, homepage }) => (
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
        <i>Language: {language}</i>
      </p>
    )}
  </div>
);

const ProjectView = props => (
  <div>
    {props.projects.map(project => (
      <ProjectDetail key={project.id} {...project} />
    ))}
  </div>
);

ProjectDetail.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  homepage: PropTypes.string,
};

ProjectView.propTypes = {
  projects: PropTypes.array,
};

export default ProjectView;
