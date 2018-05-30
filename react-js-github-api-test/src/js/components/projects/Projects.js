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
    return (
      <div className='row projects'>
        <div className='col-md-4 col-5'>
          <OrgSearch
            submitAction={e => this.handleSubmit(e)}
            orgName={this.props.orgData.orgName}
            onChangeAction={this.handleChange}
          />
          {this.props.projectsData.projectsIsLoading &&
            !this.props.projectsData.projectsHasErrored && <p>Loading projects...</p>}
          {this.props.projectsData.projectsHasErrored && !this.props.projectsData.projectsIsLoading &&
            <p>Error... Please check the organisation name!</p>}
          {this.props.projectsData.projects && (
            <ProjectsList
              projects={this.props.projectsData.projects}
              org={this.props.orgData.orgName}
              number={this.props.projectsData.projectsNumber}
              action={this.getProjectDetails}
            />
          )}
        </div>
        <div className='col-md-8 col-7'>
          {this.props.projectsData.projects
            && !this.props.projectsData.project.projectInfo
            && !this.props.projectsData.projectsHasErrored
            && <h3 className='alert alert-secondary'>Click on a project to see its details!</h3>
          }
          {this.props.projectsData.project.projectInfo && (
            <div>
              <ProjectView
                projects={this.props.projectsData.project.projectInfo}
              />
              {this.props.projectsData.project.contributors.contributorsIsLoading && <p>Loading contributors...</p>}
              {this.props.projectsData.project.contributors.contributorsHasErrored
                && !this.props.projectsData.project.contributors.contributorsIsLoading
                && <p>Error while loading contributors...</p>
              }
              {this.props.projectsData.project.contributors.projectContributors
                && !this.props.projectsData.project.contributors.contributorsIsLoading
                && (
                  <ContributorsList
                    contributors={this.props.projectsData.project.contributors.projectContributors}
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
