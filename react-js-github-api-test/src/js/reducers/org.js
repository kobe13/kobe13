const orgName = (state = null, action) => {
  switch (action.type) {
    case 'ORG_NAME':
      return action.orgName;
    default:
      return state;
  }
};

export default orgName;
