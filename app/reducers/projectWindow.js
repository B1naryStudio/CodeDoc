import { TREE_LOAD, FILE_OPENED, CLEAR_CURRENT_PROJECT } from '../actions/projectWindow';

let initialState = {
	tree: {},
	openedFiles: [],
	count: {}
}

export default function projectWindow(state = initialState, action) {
	switch (action.type) {
		case TREE_LOAD:
			//let tree = readFile(action.payload.path)
			return Object.assign({}, state, {
				tree: action.payload.tree
			})
		case FILE_OPENED: {
			let fileList = state.openedFiles;
			fileList.push(action.payload.openFile);
			return Object.assign({}, state, {
				openedFiles: fileList,
				count: fileList.length
			})
		}
		case CLEAR_CURRENT_PROJECT: {
			return Object.assign({}, state, initialState)
		}
		default:
			return state
	}
}