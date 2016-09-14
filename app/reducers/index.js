import { combineReducers } from 'redux';
import modemanager from './modemanager';
import { syncHistory, routeReducer } from 'redux-simple-router';
import mainWindow from './mainWindow';
import modalWindow from './modalWindow';
import projectWindow from './projectWindow';
import windowManager from './windowManager';


const rootReducer = combineReducers({
  routing: routeReducer,
  modemanager,
  mainWindow,
  modalWindow,
  projectWindow,
  windowManager
});

export default rootReducer;
