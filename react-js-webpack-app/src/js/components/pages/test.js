import * as React from 'react';
import { Route } from 'react-router-dom';
import PageTemplate from '../common/pageTemplate';
import TestMenu from '../common/testMenu';
import Clock from '../clock';
import TestingZone from '../testingZone';

const TestZone = () =>
      <PageTemplate>
        <section>
          <h1>TEST</h1>
          <Route component={TestMenu}/>
          <Route path='/test/testing-zone' component={TestingZone}/>
          <Route path='/test/clock' component={Clock}/>
        </section>
      </PageTemplate>;

export default TestZone;
