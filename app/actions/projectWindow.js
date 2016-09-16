export const TREE_LOAD = 'TREE_LOAD';
export const CREATE_FILE = 'CREATE_FILE';
export const FILE_OPENED = 'FILE_OPENED';
export const CLOSE_ALL_FILES = 'CLOSE_ALL_FILES';
export const DRAG_AND_DROP = 'DRAG_AND_DROP';
export const DRAG_AND_DROP_BEGIN = 'DRAG_AND_DROP_BEGIN';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CLEAR_CURRENT_PROJECT = 'CLEAR_CURRENT_PROJECT';
export const CONTENT_TREE_LOAD = 'CONTENT_TREE_LOAD';

import {FilesService} from '../services/filesService';
const fs = require('fs');

export function loadTree(tree) {
		return {
		type: TREE_LOAD,
		payload: { tree: tree }
	};
}

export function createFile(file) {
    return (dispatch, getStore) => {
        let store = getStore();
		let files = store.projectWindow.openedFiles;
		var dir = file.docsPath.slice(0, -file.name.length - 4);
		if (!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
        FilesService.createFile(file.docsPath, () => {
            dispatch({ type: 'LOAD_FILE', text: '', link: file.docsPath });
			file.key = files.length;
			files.push(file);
			dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: file } });
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
			file.mainWindow = {textChanged: false};
			files.push(file);
			FilesService.openFile(file.path, (text) =>{
				dispatch({ type: 'LOAD_CODE_FILE', payload: {text} });
			}, () => {
				dispatch({ type: 'LOAD_CODE_FILE', payload: {text: 'no content'} });
			});
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
		files.forEach(function(item, i){
			item.key = i;
		});
		if(index-1 <= 0){
			activeFile = files[0];
		} else{
			activeFile = files[index-1];
		}
		
		dispatch({ type: 'LOAD_OPENED_FILE', payload: {mainWindow: activeFile.mainWindow} });
		dispatch({type: FILE_OPENED, payload: { openedFiles: files, activeFile: activeFile } });
	};
}

export function changeTabPosition(dragIndex, hoverIndex){
	return (dispatch, getStore) => {
		let store = getStore();
		let files = store.projectWindow.openedFiles;
		let fileToSlice = files[dragIndex];
		//let activeFilePath = store.projectWindow.activeFile.path;
		//console.log('activeFile - key', store.projectWindow.activeFile.key);
		files.splice(dragIndex, 1);
		files.splice(hoverIndex, 0, fileToSlice);
		files.forEach(function(item, index){
			item.key = index;
		});
		// let activeFile = files.find(function(item){
		// 	return item.path === activeFilePath;
		// });
		dispatch({type: DRAG_AND_DROP, payload: { openedFiles: files, /*activeFile: activeFile,*/ dragAndDrop: !store.projectWindow.dragAndDrop} });
	};
}

export function beginDrag(){
	return {
		type: DRAG_AND_DROP_BEGIN
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

