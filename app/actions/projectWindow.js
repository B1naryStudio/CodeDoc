export const TREE_LOAD = 'TREE_LOAD';


export function loadTree(tree) {
	return {
		type: TREE_LOAD,
		tree: tree
	};
}

export function loadFile(text, link) {
	return {
		type: 'LOAD_FILE',
		text,
		link
	};
}