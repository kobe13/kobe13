import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchProjects,
  projectDetail,
  fetchProjectContributors,
  projectsCleanUp,
} from '../../actions/projects';
import orgName from '../../actions/org';
import ProjectsList from './ProjectsList';
import ProjectView from './ProjectDetail';
import ContributorsList from './ContributorsList';
import OrgSearch from './OrgSearch';

class Projects extends PureComponent {
  constructor() {
    super();

    // Binding methods
    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Search form
  handleSubmit(e) {
    e.preventDefault();

    this.props.fetchData(this.props.orgData.orgName);
  }

  handleChange(e) {
    const { target } = e;
    const { name } = target;

    if (name === 'orgName') {
      this.props.cleanProjects(target.value);
    }
  }

  // get a project information
  getProjectDetails(e, id, urlContributors) {
    const projectDetails = this.props.projectsData.projects.filter(
      project => project.id === id
    );

    e.preventDefault();
    this.props.getProjectDetails(projectDetails);
    this.props.getContributors(urlContributors);

    // scroll up after loading project info
    window.scrollTo(0, 0);
  }

  render() {
    const { projectsData, orgData } = this.props;
    const {
      projects,
      projectsHasErrored,
      projectsIsLoading,
      project,
      projectsNumber,
    } = projectsData;
    const { contributors, projectInfo } = project;

    return (
      <div className="row projects">
        <div className="col-md-4 col-6">
          <OrgSearch
            submitAction={e => this.handleSubmit(e)}
            orgName={orgData.orgName}
            onChangeAction={this.handleChange}
          />
          {projectsIsLoading &&
            !projectsHasErrored && (
              <p className="p-3 mb-2 bg-info text-white">Loading projects...</p>
            )}
          {projectsHasErrored &&
            !projectsIsLoading && (
              <p className="p-3 mb-2 bg-danger text-white">
                Error... Please check the organisation name!
              </p>
            )}
          {projects && (
            <ProjectsList
              projects={projects}
              org={orgData.orgName}
              number={projectsNumber}
              action={this.getProjectDetails}
            />
          )}
        </div>
        <div className="col-md-8 col-6">
          {projects &&
            !projectInfo &&
            !projectsHasErrored && (
              <h3 className="alert-secondary">
                Click on a project to see its details!
              </h3>
            )}
          {projectInfo && (
            <div>
              <ProjectView projects={projectInfo} />
              {contributors.contributorsIsLoading && (
                <p className="p-3 mb-2 bg-info text-white">
                  Loading contributors...
                </p>
              )}
              {contributors.contributorsHasErrored &&
                !contributors.contributorsIsLoading && (
                  <p className="p-3 mb-2 bg-danger text-white">
                    Error while loading contributors...
                  </p>
                )}
              {contributors.projectContributors &&
                !contributors.contributorsIsLoading && (
                  <ContributorsList
                    contributors={contributors.projectContributors}
                  />
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  fetchData: PropTypes.func.isRequired,
  cleanProjects: PropTypes.func.isRequired,
  projectsData: PropTypes.array.isRequired,
  orgData: PropTypes.array.isRequired,
  getProjectDetails: PropTypes.func.isRequired,
  getContributors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projectsData: state.projectsData,
  orgData: state.orgData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: org => dispatch(fetchProjects(org)),
  cleanProjects: org => {
    dispatch(projectsCleanUp());
    dispatch(orgName(org));
  },
  getProjectDetails: details => {
    dispatch(projectDetail(details));
  },
  getContributors: contributors => {
    dispatch(fetchProjectContributors(contributors));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
