import React from 'react';
import fetch from 'isomorphic-fetch';
import ProjectsList from './ProjectsList';
import ProjectView from './ProjectDetail';
import ContributorsList from './ContributorsList';
import OrgSearch from './OrgSearch';

class Projects extends React.Component {
  constructor() {
    super();

    // Initial state values
    this.state = {
      loadedProjects: false,
      loadingProjects: false,
      loadedProjectInfo: false,
      loadedContributors: false,
      error: false,
      errorContributors: false,
      projects: [],
      projectInfo: [],
      projectContributors: [],
      projectsNumbers: '',
      orgName: '',
    };

    // Binding methods
    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Search form
  handleSubmit(e) {
    e.preventDefault();

    this.fetchProjects(this.state.orgName);
  }

  handleChange(e) {
    const { target } = e;
    const { name } = target;

    this.setState({
      [name]: target.value,
      loadedProjects: false,
      loadedProjectInfo: false,
      loadingProjects: false,
      error: false,
    });
  }

  // get all projects of an organisation
  fetchProjects(org) {
    this.setState({
      loadingProjects: true,
      loadedProjects: false,
    });

    fetch(`https://api.github.com/orgs/${org}/repos`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((json) => {
        this.setState({
          projects: json.sort((a, b) => b.watchers - a.watchers), // sort by watchers
          projectsNumber: json.length,
          loadedProjects: true,
          loadingProjects: false,
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  // get a project information
  getProjectDetails(e, id, urlContributors) {
    const projectDetails = this.state.projects.filter(project => project.id === id);

    e.preventDefault();

    this.setState({
      projectInfo: projectDetails,
      loadedProjectInfo: true,
      loadedContributors: false,
    });

    this.fetchProjectContributors(urlContributors);

    // scroll up after loading project info
    window.scrollTo(0, 0);
  }

  // get all contributors of a project
  fetchProjectContributors(url) {
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((json) => {
        this.setState({
          projectContributors: json,
          loadedContributors: true,
        });
      })
      .catch(() => {
        this.setState({ errorContributors: true });
      });
  }

  render() {
    return (
      <div className='row projects'>
        <div className='col-md-4 col-5'>
          <OrgSearch
            submitAction={e => this.handleSubmit(e)}
            orgName={this.state.orgName}
            onChangeAction={this.handleChange}
          />
          {this.state.loadingProjects && !this.state.loadedProjects && !this.state.error && <p>Loading projects...</p>}
          {this.state.error && <p>Error... Please check the organisation name!</p>}
          {this.state.loadedProjects && (
            <ProjectsList
              projects={this.state.projects}
              org={this.state.orgName}
              number={this.state.projectsNumber}
              action={this.getProjectDetails}
            />
          )}
        </div>
        <div className='col-md-8 col-7'>
          {this.state.loadedProjects && !this.state.loadedProjectInfo && !this.state.error &&
            <h3 className='alert alert-secondary'>Click on a project to see its details!</h3>}
          {this.state.loadedProjectInfo && (
            <div>
              <ProjectView
                projects={this.state.projectInfo}
              />
              {!this.state.loadedContributors && !this.state.loadedContributors && <p>Loading contributors...</p>}
              {this.state.errorContributors && <p>Error while loading contributors...</p>}
              {this.state.loadedContributors && (
                <ContributorsList
                  contributors={this.state.projectContributors}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Projects;
