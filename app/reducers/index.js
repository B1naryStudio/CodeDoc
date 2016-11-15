import {
  combineReducers
} from 'redux';
import modemanager from './modemanager';
import {
  syncHistory,
  routeReducer
} from 'redux-simple-router';
import mainWindow from './mainWindow';
import modalWindow from './modalWindow';
import projectWindow from './projectWindow';
import windowManager from './windowManager';
import contextMenu from './contextMenu.reducer';


const rootReducer = combineReducers({
  routing: routeReducer,
  modemanager,
  mainWindow,
  modalWindow,
  projectWindow,
  windowManager,
  contextMenu,
});

export default rootReducer;
