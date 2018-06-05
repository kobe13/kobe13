import * as React from 'react';
import renderer from 'react-test-renderer';
import ProjectView from './ProjectDetail';

test('Project detail with a homepage renders correctly', () => {
  const projectDetail = [
    {
      name: 'project name',
      description: 'Description here',
      language: 'React JS',
      homepage: 'https://test-url.com',
      key: 1,
    },
  ];
  const component = renderer.create(<ProjectView projects={projectDetail} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Project detail without a homepage renders correctly', () => {
  const projectDetail = [
    {
      name: 'project name',
      description: 'Description here',
      language: 'React JS',
      key: 1,
    },
  ];
  const component = renderer.create(<ProjectView projects={projectDetail} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
