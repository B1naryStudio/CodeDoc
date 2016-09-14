import { SHOW_CONTENT_WINDOW } from '../actions/windowManager';

let initialState = {
	// tree: {},
	// openedFiles: [],
	// activeFile: {}
	showContent: false
}

export default function windowManager(state = initialState, action) {
	switch (action.type) {
		// case CLEAR_CURRENT_PROJECT: {
		// 	return Object.assign({}, state, {
		// 		tree: {},
		// 		openedFiles: [],
		// 		activeFile: {}
		// 	})
		// }
		case SHOW_CONTENT_WINDOW: {
			return Object.assign({}, state, {
				showContent: !state.showContent
			})
		}
		default:
			return state
	}
}