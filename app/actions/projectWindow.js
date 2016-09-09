export const TREE_LOAD = 'TREE_LOAD';
export const CREATE_FILE = 'CREATE_FILE';
export const FILE_OPENED = 'FILE_OPENED';
export const CLEAR_CURRENT_PROJECT = 'CLEAR_CURRENT_PROJECT';

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
			addFileTab(node);
        });
        FilesService.openProjectTree(store.projectWindow.tree.path, (tree) => {
					dispatch({ type: 'TREE_LOAD', payload : {tree: tree} });
		});	
	};
}    

export function openFile(file){
	return (dispatch, getStore) => {	
		let store = getStore();

		let files = store.projectWindow.openedFiles;
		let oldFile = store.projectWindow.activeFile;
		if(oldFile){
			//let oldFile = files.find(x => {return x.path === file.path});
			for(let i=0;i<files.length;i++){
				if(oldFile.path === files[i].path){
					files[i].mainWindow = store.mainWindow;
				}
			}

		}

		let exist = files.find((x)=>{return x.path === file.path});
		if(exist === undefined){
			file.key = files.length;
			//file.mainWindow = store.mainWindow;
			files.push(file);
			FilesService.openFile(file.docsPath, (text) => {
				dispatch({ type: 'LOAD_FILE', text: text, link: file.docsPath });
				dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
				//(addFileTab(file))(dispatch, getStore);
			});
		} else {
			
			dispatch({ type: 'LOAD_OPENED_FILE', payload: {mainWindow: file.mainWindow} });
			dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
			// FilesService.openFile(file.docsPath, (text) => {
			// 	dispatch({ type: 'LOAD_FILE', text: text, link: file.docsPath });
				
			// 	(addFileTab(file))(dispatch, getStore);
			// });
		}
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

// export function addFileTab(file){
// 	return (dispatch, getStore) => {
//         let store = getStore();
// 		let files = store.projectWindow.openedFiles;
		
// 		let exist = files.find((x)=>{return x.path === file.path});
// 		if(exist === undefined){
// 			file.key = files.length;
// 			file.mainWindow = store.mainWindow;
// 			files.push(file);
// 		}
// 		dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
// 	}
// }

