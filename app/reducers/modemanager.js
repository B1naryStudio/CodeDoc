import { NEW_MARKDOWN, NEW_PROJECT_COMMENTS, OPEN_PROJECT_COMMENTS, NEW_PROJECT_DOCS, OPEN_PROJECT_DOCS, SET_TEXT_CHANGED } from '../actions/modemanager';
import { UPDATE_LOCATION } from 'redux-simple-router';

export default function modemanager(state = 0, action) {
	switch (action.type) {
		case UPDATE_LOCATION:
			return state;
		case NEW_MARKDOWN:
			return Object.assign({}, state, {
			mainWindowText: action.text
		});
		case SET_TEXT_CHANGED:
			return Object.assign({}, state, {
			textChanged: action.payload.textChanged
		});
		default:
			return state;
	}
}
