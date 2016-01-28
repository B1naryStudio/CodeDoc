import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import './app.css';
import { appSetup } from './utils/applicationSetup';
import { EvtListeners } from './utils/eventListeners';
// import { ActionsMapping } from './menu/actionsMapping';

const store = configureStore();
const app = new appSetup();
const listeners = new EvtListeners();

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
