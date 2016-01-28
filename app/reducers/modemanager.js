import { OPEN_NEW_FILE, NEW_PROJECT, OPEN_PROJECT, SET_TEXT_CHANGED } from '../actions/modemanager';
import { UPDATE_LOCATION } from 'redux-simple-router';

export default function modemanager(state = 0, action) {
  switch (action.type) {
  	case UPDATE_LOCATION:
  		return state;
  	case OPEN_NEW_FILE:
  		return Object.assign({}, state, {
			mainWindowText: action.text
		});
    case SET_TEXT_CHANGED:
      return Object.assign({}, state, {
      textChanged: action.textChanged
    });
    default:
      return state;
  }
}
