import { combineReducers } from 'redux';
import counter from './counter';
import mainWindow from './mainWindow';

const rootReducer = combineReducers({
  counter, 
  mainWindow
});

export default rootReducer;
