import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchProjects,
  projectsHasErrored,
  projectDetail,
  fetchProjectContributors,
  projectsCleanUp,
} from '../../actions/projects';
import orgName from '../../actions/org';
import ProjectsList from './ProjectsList';
import ProjectView from './ProjectDetail';
import ContributorsList from './ContributorsList';
import OrgSearch from './OrgSearch';

class Projects extends Component {
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
    const projectDetails = this.props.projectsData.projects.filter(project => project.id === id);

    e.preventDefault();
    this.props.getProjectDetails(projectDetails);
    this.props.getContributors(urlContributors);

    // scroll up after loading project info
    window.scrollTo(0, 0);
  }

  render() {
    const { projectsData, orgData } = this.props;
    const { contributors } = this.props.projectsData.project;

    return (
      <div className='row projects'>
        <div className='col-md-4 col-5'>
          <OrgSearch
            submitAction={e => this.handleSubmit(e)}
            orgName={orgData.orgName}
            onChangeAction={this.handleChange}
          />
          {projectsData.projectsIsLoading &&
            !projectsData.projectsHasErrored && <p>Loading projects...</p>}
          {projectsData.projectsHasErrored && !projectsData.projectsIsLoading &&
            <p>Error... Please check the organisation name!</p>}
          {projectsData.projects && (
            <ProjectsList
              projects={projectsData.projects}
              org={orgData.orgName}
              number={projectsData.projectsNumber}
              action={this.getProjectDetails}
            />
          )}
        </div>
        <div className='col-md-8 col-7'>
          {projectsData.projects
            && !projectsData.project.projectInfo
            && !projectsData.projectsHasErrored
            && <h3 className='alert alert-secondary'>Click on a project to see its details!</h3>
          }
          {projectsData.project.projectInfo && (
            <div>
              <ProjectView
                projects={projectsData.project.projectInfo}
              />
              {contributors.contributorsIsLoading && <p>Loading contributors...</p>}
              {contributors.contributorsHasErrored
                && !contributors.contributorsIsLoading
                && <p>Error while loading contributors...</p>
              }
              {contributors.projectContributors
                && !contributors.contributorsIsLoading
                && (
                  <ContributorsList
                    contributors={contributors.projectContributors}
                  />
                )
              }
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
  cleanProjects: (org) => {
    dispatch(projectsCleanUp());
    dispatch(projectsHasErrored(false));
    dispatch(orgName(org));
  },
  getProjectDetails: (details) => {
    dispatch(projectDetail(details));
  },
  getContributors: (contributors) => {
    dispatch(fetchProjectContributors(contributors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
