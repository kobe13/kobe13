import * as React from 'react';
import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import Button from './Button';

let container: ReactWrapper;
let containerProp: any;

describe('Button - No props', () => {
  const mockFn = jest.fn();
  const wrapper = mount(<Button onClick={mockFn} />);

  describe('render <button>', () => {
    beforeEach(() => {
      container = wrapper.find('button');
      containerProp = container.props();
    });

    it('should have a <button>', () => {
      expect(container).toHaveLength(1);
    });

    it('should have a <button> without disable prop', () => {
      expect(containerProp.disabled).toEqual(false);
    });

    it('should have a <button> without title prop', () => {
      expect(containerProp.title).toEqual('');
    });

    it('should have a <button> without onClick prop', () => {
      expect(containerProp.onClick).toBeDefined();
    });

    it('<button> should fire click event', () => {
      wrapper.simulate('click');
      expect(mockFn).toHaveBeenCalled();
    });

    it('should have a <button> without children prop', () => {
      expect(containerProp.children).toHaveLength(0);
    });
  });
});

describe('Button - props', () => {
  const mockFn = jest.fn();
  const wrapper = mount(
    <Button title="Click Me" disabled={false} onClick={mockFn}>
      <p>Click</p>
    </Button>
  );

  beforeEach(() => {
    container = wrapper.find('button');
    containerProp = container.props();
  });

  it('should have a <button> with disable prop', () => {
    expect(containerProp.disabled).toEqual(false);
  });

  it('<button> should fire click event', () => {
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should have a <button> with title prop', () => {
    expect(containerProp.title).toEqual('Click Me');
  });

  it('should have a <button> with onClick prop', () => {
    expect(containerProp.onClick).toBeDefined();
  });

  it('should have a <button> with children prop', () => {
    expect(containerProp.children).toEqual(<p>Click</p>);
  });
});

describe('Button - disable', () => {
  const mockFn = jest.fn();
  const wrapper = mount(
    <Button title="Click Me" disabled={true} onClick={mockFn}>
      <p>Click</p>
    </Button>
  );

  beforeEach(() => {
    container = wrapper.find('button');
    containerProp = container.props();
  });

  it('<button> should not fire click event', () => {
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
