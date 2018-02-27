import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Home } from './components/home.component';
import { API } from './api/api';

ReactDOM.render(
  <Home api={new API('http://localhost:5000')} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
