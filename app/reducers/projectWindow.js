import { TREE_LOAD, FILE_OPENED, CLOSE_ALL_FILES, DRAG_AND_DROP, CLEAR_CURRENT_PROJECT,
	DRAG_AND_DROP_BEGIN, UPDATE_PROJECT } from '../actions/projectWindow';

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
		case DRAG_AND_DROP: {
			return Object.assign({}, state, {
				openedFiles: action.payload.openedFiles,
				/*activeFile: action.payload.activeFile,*/
				dragAndDrop: action.payload.dragAndDrop
			})
		}
		case DRAG_AND_DROP_BEGIN: {
			return Object.assign({}, state, {
				dragAndDrop: false
			})
		}
		case CLOSE_ALL_FILES: {
			return Object.assign({}, state, {
				openedFiles: [],
				activeFile: {}
			})
		}
		case CLEAR_CURRENT_PROJECT: {
			return Object.assign({}, state, {
				tree: {},
				openedFiles: [],
				activeFile: {}
			})
		}
		case UPDATE_PROJECT: {
			return Object.assign({}, state, {
				openedFiles: action.payload.openedFiles
			})
		}
		default:
			return state
	}
}