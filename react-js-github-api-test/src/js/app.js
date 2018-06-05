import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';

// PAGES
import Home from './components/pages/home';
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
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Error404} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
