export const TREE_LOAD = 'TREE_LOAD';
export const CREATE_FILE = 'CREATE_FILE';

import {FilesService} from '../services/filesService';
const fs = require('fs');

export function loadTree(tree) {
		return {
		type: TREE_LOAD,
		payload: { tree: tree }
	};
}

export function createFile(node) {
    return (dispatch, getStore) => {
        let store = getStore();
		
		var dir = node.docsPath.slice(0, -node.name.length - 4);
		if (!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
        FilesService.createFile(node.docsPath, () => {
            dispatch({ type: 'LOAD_FILE', text: '', link: node.docsPath });
        });
        FilesService.openProjectTree(store.projectWindow.tree.path, (tree) => {
					dispatch({ type: 'TREE_LOAD', payload : {tree: tree} });
		});	
	};
}    

export function openFile(node){
	return (dispatch) => {	
		
		FilesService.openFile(node.docsPath, (text) => {
            dispatch({ type: 'LOAD_FILE', text: text, link: node.docsPath });
        });
	};
}

export function loadFile(text, link) {
	return {
		type: 'LOAD_FILE',
		text,
		link
	};
}

export function updateTree(text, link) {
	return (dispatch, getStore) => {
        let store = getStore();
		let tree = store.projectWindow.tree;
		dispatch({type: 'TREE_LOAD', tree});
	}
}