export const TREE_LOAD = 'TREE_LOAD';
export const CREATE_FILE = 'CREATE_FILE';
export const FILE_OPENED = 'FILE_OPENED';
export const CLOSE_ALL_FILES = 'CLOSE_ALL_FILES';
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
			for(let i=0;i<files.length;i++){
				if(oldFile.path === files[i].path){
					files[i].mainWindow = store.mainWindow;
				}
			}
		}

		let exist = files.find((x)=>{return x.path === file.path});
		if(exist === undefined){
			file.key = files.length;
			files.push(file);
			FilesService.openFile(file.docsPath, (text) => {
				dispatch({ type: 'LOAD_FILE', text: text, link: file.docsPath });
				dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
			});
		} else {			
			dispatch({ type: 'LOAD_OPENED_FILE', payload: {mainWindow: file.mainWindow} });
			dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
		}
	};
}

export function closeFile(){
	return (dispatch, getStore) => {	
		let store = getStore();

		let files = store.projectWindow.openedFiles;
		let activeFile = store.projectWindow.activeFile;

		let index = -1;
		for(let i = 0; i < files.length; i++) {
			if (files[i].path === activeFile.path) {
				index = i;
				break;
			}
		}

		files.splice(index, 1);
		if(files.length === 0) {
			dispatch({ type: 'CLEAR_CURRENT_FILE'});
			dispatch({ type: 'CLOSE_ALL_FILES'  });
			return;
		}
		files.forEach(function(item, index){
			item.key = index;
		});
		if(index-1 <= 0){
			activeFile = files[0];
		} else{
			activeFile = files[index-1];
		}
		
		dispatch({ type: 'LOAD_OPENED_FILE', payload: {mainWindow: activeFile.mainWindow} });
		dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: activeFile } });
		// if(exist === undefined){
		// 	file.key = files.length;
		// 	files.push(file);
		// 	FilesService.openFile(file.docsPath, (text) => {
		// 		dispatch({ type: 'LOAD_FILE', text: text, link: file.docsPath });
		// 		dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
		// 	});
		// } else {			
		// 	dispatch({ type: 'LOAD_OPENED_FILE', payload: {mainWindow: file.mainWindow} });
		// 	dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
		// }
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

