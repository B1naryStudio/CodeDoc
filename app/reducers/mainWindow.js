import { CHANGE_TEXT } from '../actions/main-window';

let initialState = {}

export default function mainWindow(state = initialState, action) {
  switch (action.type) {
	case CHANGE_TEXT:
		return Object.assign({}, state, {
			mainWindowText: action.text
		})
	default:
		return state
  }
}