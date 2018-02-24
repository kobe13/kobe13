import * as React from 'react';
import MouseEvent from './common/mouseEvent';

const TestingZone = () =>
  <section>
    <h3>Testing Zone</h3>
    <MouseEvent render={({ x, y }) => (
      // The render prop gives us the state we need
      // to render whatever we want here.
      <h2>
        The mouse position is ({x}, {y})
      </h2>
    )} />
  </section>;

export default TestingZone;
