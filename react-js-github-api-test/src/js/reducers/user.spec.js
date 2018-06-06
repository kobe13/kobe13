import { gitHubUser } from '../reducers/user';
import { currentUserData } from '../actions/user';

describe('github user reducer', () => {
  it('updates the store with the current user data', () => {
    const user = {
      login: 'login',
      avatar_url: 'avatar_url',
    };
    const state = {
      gitHubUser: [
        {
          login: user.login,
          avatar_url: user.avatar_url,
        },
      ],
    };
    const expectedState = { gitHubUser: state.gitHubUser };
    const newState = gitHubUser(state, {
      type: currentUserData,
      gitHubUser: user,
    });

    expect(newState).toEqual(expectedState);
  });
});
