import { TREE_LOAD } from '../actions/projectWindow';

let initialState = {
	tree: {}
}

export default function projectWindow(state = initialState, action) {
	switch (action.type) {
		case TREE_LOAD:
			//let tree = readFile(action.payload.path)
			return Object.assign({}, state, {
				tree: action.payload.tree
			})
		default:
			return state
	}
}