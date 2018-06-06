import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

// PAGES
import Home from './components/pages/home';
import UserDetailPage from './components/pages/user';
import ProjectsSearch from './components/pages/projects';
import Error404 from './components/pages/error404';

// STYLE
import '../scss/main.scss';

// STORE
const store = configureStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Renders the React component into the DOM
render(
  <Provider store={store}>
    <BrowserRouter>
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:login" component={UserDetailPage} />
            <Route path="/projects" component={ProjectsSearch} />
            <Route component={Error404} />
          </Switch>
        </div>
      </HashRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
