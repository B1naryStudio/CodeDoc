import { SHOW_CODE_WINDOW, SHOW_RESULT_WINDOW } from '../actions/windowManager';

let initialState = {
	showCode: true,
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
		case SHOW_CODE_WINDOW: {
			return Object.assign({}, state, {
				showCode: !state.showCode
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