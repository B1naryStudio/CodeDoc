import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import 'bootswatch/cosmo/bootstrap.css';
import './app.css';
import { appSetup } from './utils/applicationSetup';
import { EvtListeners } from './utils/eventListeners';
// import { ActionsMapping } from './menu/actionsMapping';

const store = configureStore();
const app = new appSetup();
const listeners = new EvtListeners();

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const el = React.createClass({
  render: function(){
    return (<Provider store={store}>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </Provider>);
  }
});

var Ex = DragDropContext(HTML5Backend)(el);
render(<Ex />, document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
