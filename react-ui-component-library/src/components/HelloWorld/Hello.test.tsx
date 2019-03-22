import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import HelloWorld from './HelloWorld';
import { sdkTheme } from '../../theme';

describe('HelloWorld', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelloWorld />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(' content renders correctly', () => {
    const tree = create(
      <HelloWorld message="Click me" background={sdkTheme.backgroundColor.alternativeColor} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
