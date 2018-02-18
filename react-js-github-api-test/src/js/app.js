import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';

// PAGES
import Home from './components/pages/home';
import Error404 from './components/pages/error404';

// STYLE
import '../scss/main.scss';

// Renders the React component into the DOM
ReactDOM.render(
    <HashRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route component={Error404}/>
        </Switch>
      </div>
    </HashRouter>,
    document.getElementById('app'),
);
