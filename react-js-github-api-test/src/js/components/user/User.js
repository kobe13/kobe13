import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserDetail } from '../../actions/user';
import makeGetCurrentUserState from '../../selectors/selectors';
import BackButton from '../common/backButton';

class User extends PureComponent {
  componentDidMount() {
    // check if the current user is already in the app state, if no then fetch data from GitHub
    if (!this.props.currentUserStateData.currentUser) {
      this.props.fetchData(this.props.userLogin);
    }
  }

  render() {
    const { currentUserStateData, fetchedUserData } = this.props;
    const {
      gitHubUser,
      currentUserHasErrored,
      currentUserIsLoading,
    } = fetchedUserData;
    const { currentUser } = currentUserStateData;
    const userData = !currentUser ? gitHubUser : currentUser;

    return (
      <div className="user list-group-item">
        {currentUserIsLoading &&
          !currentUserHasErrored && (
            <p className="p-3 mb-2 bg-info text-white">
              Loading user details...
            </p>
          )}
        {currentUserHasErrored &&
          !currentUserIsLoading && (
            <p className="p-3 mb-2 bg-danger text-white">
              Error during user loading... Please reload the page
            </p>
          )}
        {userData &&
          !currentUserIsLoading && (
            <div className="row">
              <div className="col-12">
                <div className="media">
                  <img className="mr-3" src={userData.avatar_url} width="64" />
                  <div className="media-body mb-2 mt-2">
                    <h5 className="mt-0">
                      <b>{userData.login}</b> <i>(id: {userData.id})</i>
                    </h5>
                    <a href={userData.html_url}>{userData.html_url}</a>
                  </div>
                  <BackButton />
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

User.propTypes = {
  fetchData: PropTypes.func.isRequired,
  fetchedUserData: PropTypes.array.isRequired,
  userLogin: PropTypes.string.isRequired,
  currentUserStateData: PropTypes.array.isRequired,
};

const makeMapStateToProps = () => {
  const getCurrentUserState = makeGetCurrentUserState();
  return (state, props) => ({
    currentUserStateData: getCurrentUserState(state, props),
    fetchedUserData: state.currentUserData,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchData: login => dispatch(fetchUserDetail(login)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(User);
