import { combineReducers } from 'redux';
import modemanager from './modemanager';
import { syncHistory, routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
  routing: routeReducer,
  modemanager
});

export default rootReducer;
