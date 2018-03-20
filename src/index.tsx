import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Home } from './components/home.component';
// import { API } from './api/api';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Login } from './components/login';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
