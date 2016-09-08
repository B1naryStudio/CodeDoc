import { TREE_LOAD, FILE_OPENED, CLEAR_CURRENT_PROJECT } from '../actions/projectWindow';

let initialState = {
	tree: {},
	openedFiles: [],
	activeFile: {}
}

export default function projectWindow(state = initialState, action) {
	switch (action.type) {
		case TREE_LOAD:
			//let tree = readFile(action.payload.path)
			return Object.assign({}, state, {
				tree: action.payload.tree
			})
		case FILE_OPENED: {
			// let fileList = state.openedFiles;
			// fileList.push(action.payload.openFile);
			
			return Object.assign({}, state, {
				openedFiles: action.payload.openedFiles,
				activeFile: action.payload.activeFile
			})
		}
		case CLEAR_CURRENT_PROJECT: {
			return Object.assign({}, state, {
				tree: {},
				openedFiles: [],
				activeFile: {}
			})
		}
		default:
			return state
	}
}