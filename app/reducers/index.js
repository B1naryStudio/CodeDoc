import { combineReducers } from 'redux';
import counter from './counter';
import toolbar from './toolbar';
import mainWindow from './mainWindow';

const rootReducer = combineReducers({
  counter, 
  toolbar,
  mainWindow
});

export default rootReducer;
