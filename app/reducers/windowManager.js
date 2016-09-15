import { SHOW_CONTENT_WINDOW, SHOW_RESULT_WINDOW } from '../actions/windowManager';

let initialState = {
	showContent: false,
	showResult: true
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
		case SHOW_RESULT_WINDOW: {
			return Object.assign({}, state, {
				showResult: !state.showResult
			})
		}
		default:
			return state
	}
}