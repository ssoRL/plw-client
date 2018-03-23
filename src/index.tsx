import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { PlwRoutes } from './components/auth/plw-routes';

ReactDOM.render(
  <PlwRoutes/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
