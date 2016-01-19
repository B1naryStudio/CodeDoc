import { OPEN_NEW_FILE, OPEN_DOCUMENTING, OPEN_LINE_COMMENTING } from '../actions/modemanager';
import { UPDATE_LOCATION } from 'redux-simple-router';

export default function modemanager(state = 0, action) {
  switch (action.type) {
  	case UPDATE_LOCATION:
  		console.log('We are here!');
  		return state;
  	case OPEN_NEW_FILE:
  		return Object.assign({}, state, {
			mainWindowText: action.text
		});
    default:
      return state;
  }
}
