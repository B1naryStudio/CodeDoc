import { combineReducers } from 'redux';
import counter from './counter';
import mainWindow from './mainWindow';
import modalWindow from './modalWindow';

const rootReducer = combineReducers({
  counter, 
  mainWindow,
  modalWindow
});

export default rootReducer;