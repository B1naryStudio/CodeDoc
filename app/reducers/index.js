import { combineReducers } from 'redux';
import modemanager from './modemanager';
import { syncHistory, routeReducer } from 'redux-simple-router';
import mainWindow from './mainWindow';
import modalWindow from './modalWindow';
import projectWindow from './projectWindow';

const rootReducer = combineReducers({
  routing: routeReducer,
  modemanager,
  mainWindow,
  modalWindow,
  projectWindow
});

export default rootReducer;
