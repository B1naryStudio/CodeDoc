import { combineReducers } from 'redux';
import modemanager from './modemanager';
import { syncHistory, routeReducer } from 'redux-simple-router';
import mainWindow from './mainWindow';

const rootReducer = combineReducers({
  routing: routeReducer,
  modemanager, 
  mainWindow
});

export default rootReducer;
