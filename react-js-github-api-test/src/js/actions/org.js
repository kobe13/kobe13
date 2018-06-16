// @flow
export type OrgNameAction = {
  type: 'ORG_NAME',
  orgName: string,
};

const orgName = (name: string): OrgNameAction => ({
  type: 'ORG_NAME',
  orgName: name,
});

export default orgName;
