export const TREE_LOAD = 'TREE_LOAD';


export function changeText(tree) {
	return {
		type: TREE_LOAD,
		tree: tree
	};
}