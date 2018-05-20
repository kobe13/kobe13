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

    this.props.fetchData(this.props.orgName);
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
    const projectDetails = this.props.projects.filter(project => project.id === id);

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
            orgName={this.props.orgName}
            onChangeAction={this.handleChange}
          />
          {this.props.projectsIsLoading &&
            !this.props.projectsHasErrored && <p>Loading projects...</p>}
          {this.props.projectsHasErrored && !this.props.projectsIsLoading &&
            <p>Error... Please check the organisation name!</p>}
          {this.props.projects && (
            <ProjectsList
              projects={this.props.projects}
              org={this.props.orgName}
              number={this.props.projectsNumber}
              action={this.getProjectDetails}
            />
          )}
        </div>
        <div className='col-md-8 col-7'>
          {this.props.projects && !this.props.projectDetail && !this.props.projectsHasErrored &&
            <h3 className='alert alert-secondary'>Click on a project to see its details!</h3>}
          {this.props.projectDetail && (
            <div>
              <ProjectView
                projects={this.props.projectDetail}
              />
              {this.props.contributorsIsLoading && <p>Loading contributors...</p>}
              {this.props.contributorsHasErrored && !this.props.contributorsIsLoading &&
                <p>Error while loading contributors...</p>}
              {this.props.projectContributors && !this.props.contributorsIsLoading && (
                <ContributorsList
                  contributors={this.props.projectContributors}
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
  projectsIsLoading: PropTypes.bool.isRequired,
  projectsHasErrored: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  projectDetail: PropTypes.array.isRequired,
  projectsNumber: PropTypes.number.isRequired,
  orgName: PropTypes.string.isRequired,
  getProjectDetails: PropTypes.func.isRequired,
  getContributors: PropTypes.func.isRequired,
  projectContributors: PropTypes.array.isRequired,
  contributorsIsLoading: PropTypes.bool.isRequired,
  contributorsHasErrored: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects,
  projectDetail: state.projectInfo,
  projectsHasErrored: state.projectsHasErrored,
  projectsIsLoading: state.projectsIsLoading,
  projectsNumber: state.projectsNumber,
  orgName: state.orgName,
  projectContributors: state.projectContributors,
  contributorsHasErrored: state.contributorsHasErrored,
  contributorsIsLoading: state.contributorsIsLoading,
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
