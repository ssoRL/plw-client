import * as React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { PlwRoutes } from './components/auth/plw-routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PlwReducer } from './store/index';
import { API } from './api/api';
import { invalidateToken } from './store/auth/actions';

const middleware = [ thunk ];

const store = createStore(
  PlwReducer,
  applyMiddleware(...middleware)
);

// Initialize the 
const api = API.Instance();
api.domain = 'http://localhost:5000';
api.errorHandler = response => {
  if (response.status === 401) {
    store.dispatch(invalidateToken());
    return Promise.reject(401);
  }

  return Promise.resolve(response);
};

render(
  <Provider store={store}>
    <PlwRoutes />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
