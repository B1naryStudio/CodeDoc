import { TREE_LOAD } from '../actions/projectWindow';

let initialState = {
	tree: {}
}

export default function projectWindow(state = initialState, action) {
	switch (action.type) {
		case TREE_LOAD:
		return Object.assign({}, state, {
			tree: action.tree
		})
		default:
			return state
	}
}