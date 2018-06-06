import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsers } from '../../actions/users';
import UsersList from './UsersList';

class Users extends PureComponent {
  componentDidMount() {
    const usersAlreadyLoaded = this.props.usersData.usersNumber;

    if (!usersAlreadyLoaded) {
      this.props.fetchData();
    }
  }

  // Load more users
  handleSubmit(e) {
    e.preventDefault();

    // get the last fetched user id in order to avoid duplicated users
    const usersArray = this.props.usersData.gitHubUsers;
    const lastUserID = usersArray[usersArray.length - 1].id;

    this.props.fetchMoreData(lastUserID);
  }

  render() {
    const { usersData } = this.props;
    const {
      gitHubUsers,
      usersHasErrored,
      usersIsLoading,
      usersNumber,
    } = usersData;

    return (
      <div className="users">
        {usersHasErrored &&
          !usersIsLoading && (
            <p className="p-3 mb-2 bg-danger text-white">
              Error during GitHub Users loading... Please reload the page
            </p>
          )}
        {gitHubUsers && (
          <div>
            <UsersList users={gitHubUsers} usersNumber={usersNumber} />
            {!usersIsLoading &&
              !usersHasErrored && (
                <button
                  title="Load more Users"
                  onClick={e => this.handleSubmit(e)}
                  className="btn btn-link"
                >
                  Load more Users
                </button>
              )}
          </div>
        )}
        {usersIsLoading &&
          !usersHasErrored && (
            <p className="p-3 mb-2 bg-info text-white">Loading users...</p>
          )}
      </div>
    );
  }
}

Users.propTypes = {
  fetchData: PropTypes.func.isRequired,
  fetchMoreData: PropTypes.func.isRequired,
  usersData: PropTypes.array.isRequired,
  usersNumber: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  usersData: state.usersData,
  usersNumber: state.usersData.usersNumber,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchUsers()),
  fetchMoreData: usersSince => dispatch(fetchUsers(usersSince)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
