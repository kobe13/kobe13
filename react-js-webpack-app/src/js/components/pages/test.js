import * as React from 'react';
import { Route } from 'react-router-dom';
import PageTemplate from '../common/pageTemplate';
import TestMenu from '../common/testMenu';
import Clock from '../Clock';
import Api from '../Api';
import TestingZone from '../TestingZone';

const TestZone = () =>
      <PageTemplate>
        <section>
          <h1>TEST</h1>
          <Route component={TestMenu}/>
          <Route exact path='/test/testing-zone' component={TestingZone}/>
          <Route path='/test/api' component={Api}/>
          <Route path='/test/clock' component={Clock}/>
        </section>
      </PageTemplate>;

export default TestZone;
