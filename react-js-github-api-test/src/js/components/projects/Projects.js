// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
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

type Props = {
  fetchData: (org: string) => void,
  cleanProjects: (org: string) => void,
  projectsData: {
    projectsNumber: number,
    projects: [],
    project: {
      contributors: [],
      projectInfo: [],
    },
    contributors: [],
    projectsHasErrored: boolean,
    projectsIsLoading: boolean,
  },
  orgData: {
    orgName: string,
  },
  getProjectDetails: (details: {}) => void,
  getContributors: (urlContributors: string) => void,
};

class Projects extends PureComponent<Props> {
  // Search form
  handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.props.fetchData(this.props.orgData.orgName);
  };

  handleChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.props.cleanProjects(e.currentTarget.value);
  };

  // get a project information
  getProjectDetails = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
    urlContributors: string
  ) => {
    const projectDetails = this.props.projectsData.projects.filter(
      project => project.id === id
    );

    e.preventDefault();
    this.props.getProjectDetails(projectDetails);
    this.props.getContributors(urlContributors);

    // scroll up after loading project info
    window.scrollTo(0, 0);
  };

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
            submitAction={this.handleSubmit}
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
          <LoadingBar className="loading-bar" scope="orgSearchBar" />
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
              <LoadingBar className="loading-bar" scope="contributorsBar" />
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
