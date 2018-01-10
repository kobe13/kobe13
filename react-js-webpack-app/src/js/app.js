import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// PAGES
import Home from './components/pages/home';
import Contact from './components/pages/contact';
import BlogPage from './components/pages/blog';
import PostPage from './components/pages/post';
import TestZone from './components/pages/test';
import Error404 from './components/pages/error404';

// STYLE
import '../scss/main.scss';

// Renders the React component into the DOM
ReactDOM.render(
    <HashRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/test' component={TestZone}/>
          <Redirect from='/testing-zone' to='/test/testing-zone'/>
          <Redirect from='/api' to='/test/api'/>
          <Redirect from='/clock' to='/test/clock'/>
          <Route path='/blog' component={BlogPage}/>
          <Route path='/post/:id' component={PostPage}/>
          <Route path='/contact' component={Contact}/>
          <Route component={Error404}/>
        </Switch>
      </div>
    </HashRouter>,
    document.getElementById('app'),
);
