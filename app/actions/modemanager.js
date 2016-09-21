export const NEW_PROJECT_COMMENTS = 'NEW_PROJECT_COMMENTS';
export const NEW_PROJECT_DOCS = 'NEW_PROJECT_DOCS';
export const OPEN_MARKDOWN = 'OPEN_MARKDOWN';
export const OPEN_PROJECT_COMMENTS = 'OPEN_PROJECT_COMMENTS';
export const OPEN_PROJECT_DOCS = 'OPEN_PROJECT_DOCS';
export const NEW_MARKDOWN = 'NEW_MARKDOWN';
export const SET_TEXT_CHANGED = 'SET_TEXT_CHANGE';

import { routeActions } from 'redux-simple-router'
import {FilesService} from '../services/filesService';
import {CheckChangesService} from '../services/checkChangesService';
import {guid} from '../services/guid';

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;
const app = electron.app;

export function createMarkdownFile(calledFromHomeScreen = false) {
	return (dispatch, getStore) => {
		let store = getStore();
		if (store.routing.location.pathname !== '/md-file-mode') {
			dispatch(routeActions.push('/md-file-mode'));
		} else {
			checkChanges(store, () => dispatch({ type: 'CLEAR_CURRENT_FILE'}));
		}
	}
}

export function openMarkdownFile(calledFromHomeScreen = false) {
	return (dispatch, getStore) => {
		let store = getStore();
		if (store.routing.location.pathname !== '/md-file-mode' || !(store.mainWindow && store.mainWindow.textChanged)) {
			showDialogToOpenFile(dispatch);
		} else {
			//if (store.mainWindow && store.mainWindow.textChanged) {
				checkChanges(store, () => showDialogToOpenFile(dispatch));
			//} else {
				//showDialogToOpenFile(dispatch);

			//}
		}
	}
}

function showDialogToOpenFile(dispatch){
	dialog.showOpenDialog({ 
			filters: [{ 
				name: 'Markdown', 
				extensions: ['md'] 
			}]
		}, function (fileNames) {
			if (fileNames === undefined) return;
			var fileName = fileNames[0];
			dispatch({ type: 'CLEAR_CURRENT_FILE'});
			fs.readFile(fileName, 'utf-8', function (err, data) {
				dispatch({ type: 'LOAD_FILE', text: data, link: fileName });
				dispatch(routeActions.push('/md-file-mode'));
			});
		});
}

export function openRecentMarkdownFile(file) {
	return dispatch => {		
		if (file === undefined) return;
		fs.readFile(file, 'utf-8', function (err, data) {
			dispatch({ type: 'LOAD_FILE', text: data, link: file });
			dispatch(routeActions.push('/md-file-mode'));
		});
	}
}

export function saveFile() {
	return (dispatch, getStore) => {
		let store = getStore();

		if (store.mainWindow.textChanged) {
			if (store.mainWindow.currentLink){
				FilesService.saveFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, () =>{
					dispatch({type: 'UPDATE_CURRENT_LINK', payload: {link: store.mainWindow.currentLink}});
				});
			} else {
				CheckChangesService.saveFileDialogBox(
					store,
					function(filePath) {
						dispatch({ type: 'UPDATE_CURRENT_LINK', payload: {link: filePath} });
					}
				);
			}
		} else {
			console.log('NO FILE OPENED OR NO CHANGES MADE');
		}
	}
}

export function saveAllFiles() {
	return (dispatch, getStore) => {
		let store = getStore();
		if(CheckChangesService.checkProjectChange(store)){
			let openedFiles = store.projectWindow.openedFiles;
			openedFiles.forEach((item) => {
				if(item.mainWindow.textChanged){
					item.mainWindow.textChanged = false;
					FilesService.saveFile(item.mainWindow.currentLink, item.mainWindow.mainWindowText);
				}
			});
			dispatch({type: 'UPDATE_PROJECT', payload: {openedFiles}})
			if(store.mainWindow.textChanged){
				FilesService.saveFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, () =>{
					dispatch({type: 'UPDATE_CURRENT_LINK', payload: {link: store.mainWindow.currentLink}});
				});
			}
			return;
		}


		if (store.mainWindow.textChanged) {
			if (store.mainWindow.currentLink){
				FilesService.saveFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, () =>{
					dispatch({type: 'UPDATE_CURRENT_LINK', payload: {link: store.mainWindow.currentLink}});
				});
			} else {
				CheckChangesService.saveFileDialogBox(
					store,
					function(filePath) {
						dispatch({ type: 'UPDATE_CURRENT_LINK', payload: {link: filePath} });
					}
				);
			}
		} else {
			console.log('NO FILE OPENED OR NO CHANGES MADE');
		}
	}
}

// remove this function -> design-the-workflow-for-one-mode-application
export function createProjectComments(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		let store = getStore();

		if (calledFromHomeScreen){
			dialog.showOpenDialog({ 
				properties: ['openDirectory', 'createDirectory']
			}, function (folderPath) {
				console.log(folderPath[0]);
				var tree = CheckChangesService.getFileTree(folderPath[0]);
				tree.toggled = true;
				dispatch({ type: 'TREE_LOAD', tree: tree });
				dispatch(routeActions.push('/project-comments-mode'));
				/*if (fileNames === undefined) return;
				var fileName = fileNames[0];
				fs.readFile(fileName, 'utf-8', function (err, data) {
					dispatch({ type: 'LOAD_FILE', text: data, link: fileName });
					dispatch(routeActions.push('/md-file-mode'));
				});*/
			});
		} else {
			console.log('---RUN LOGIC--- FOR createProjectComments');
		}
	}



	/*return (dispatch, getStore) => {
		let store = getStore();

		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/project-comments-mode'));
		} else {
			if (store.mainWindow && store.mainWindow.textChanged) {
				saveChangesConfirmDialogBox(
					store,
					function() {
						return dispatch({ type: 'CLEAR_CURRENT_FILE'});
					}
				);
			} else {
				return dispatch({ type: 'CLEAR_CURRENT_FILE'});
			}
		}
	}*/

	/*return {
		type: NEW_PROJECT_COMMENTS
	}*/
}

// remove this function -> design-the-workflow-for-one-mode-application
export function openProjectComments(calledFromHomeScreen) {
	console.log('---RUN LOGIC--- FOR OPENING PROJECT comms');
	return {
		type: OPEN_PROJECT_COMMENTS
	}
}

export function createProjectDocs(calledFromHomeScreen = false) {
	return (dispatch, getStore) => {
		let store = getStore();
		if (!calledFromHomeScreen){
			console.log('---RUN LOGIC--- FOR asking for saving')
			if (store.mainWindow && store.mainWindow.textChanged) {
			}
		}
		//if (calledFromHomeScreen){
		dialog.showOpenDialog({ 
			properties: ['openDirectory', 'createDirectory']
		}, function (folderPath) {
			if (folderPath === undefined) return;
			var treeName = path.basename(folderPath[0]);
			let docsConfig = {
				name: treeName,
				ignore: ['node_modules', '.codedoc', '.git']
			};
			var contentTree = [];
			var tree = FilesService.getFileTree(folderPath[0], docsConfig.ignore, contentTree, true);
			docsConfig.contentTree = contentTree;
			//tree.toggled = true;
			let dir = path.join(tree.path ,'.codedoc');
			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			} else {
				return;
			}

			FilesService.saveFile(path.join(dir,'docsConfig.json'), JSON.stringify(docsConfig), ()=>{
				console.log('default config created');
			});

			dispatch({ type: 'TREE_LOAD', payload: {tree}});
			dispatch({ type: 'CONTENT_TREE_LOAD', payload: {contentTree}});
			dispatch(routeActions.push('/project-docs-mode'));
		});
	}



	/*return (dispatch, getStore) => {
		let store = getStore();

		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/project-comments-mode'));
		} else {
			if (store.mainWindow && store.mainWindow.textChanged) {
				saveChangesConfirmDialogBox(
					store,
					function() {
						return dispatch({ type: 'CLEAR_CURRENT_FILE'});
					}
				);
			} else {
				return dispatch({ type: 'CLEAR_CURRENT_FILE'});
			}
		}
	}*/

	/*return {
		type: NEW_PROJECT_DOCS
	}*/
}

export function openProjectDocs() {
	return (dispatch, getStore) => {
		dialog.showOpenDialog({ 
				properties: ['openDirectory', 'createDirectory']
			}, function (folderPath) {
				FilesService.openProjectTree(folderPath[0], (tree, contentTree) => {
					dispatch({ type: 'TREE_LOAD', payload : {tree: tree} });
					dispatch({ type: 'CONTENT_TREE_LOAD', payload: {contentTree}});
					dispatch(routeActions.push('/project-docs-mode'));
				}, (content) => dialog.showErrorBox('Error', content));				
			});
	};
	/*return {
		type: OPEN_PROJECT_DOCS
	}*/
}

export function saveFileAs(){
	return (dispatch, getStore) => {
		let store = getStore();
		let files = store.projectWindow.openedFiles;
		let file = store.projectWindow.activeFile;
		let newFile= {};
		console.log('saveFileAs');		
		CheckChangesService.saveFileDialogBox(store, (filePath, fileName) =>{
			debugger;
			newFile.name = fileName;
			newFile.docsPath = filePath;
			newFile.tabKey = files.length;
			newFile.key = guid();
			newFile.mainWindow = {textChanged: false};
			files.push(newFile);
			FilesService.openFile(newFile.docsPath, (text) => {
				dispatch({ type: 'LOAD_FILE', text: text, link: newFile.docsPath });
				dispatch({type: 'FILE_OPENED', payload: { openedFiles: files, activeFile: newFile } });
			});
		});
	}
}

export function openHomeScreen(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		let store = getStore();

		CheckChangesService.checkChanges(store,	function() {
			dispatch(routeActions.push('/'));
			dispatch({ type: 'CLEAR_CURRENT_FILE'});
			dispatch({ type: 'CLEAR_CURRENT_PROJECT'});});
	}
}

export function quitApp() {
	return (dispatch, getStore) => {
		let store = getStore();
		CheckChangesService.checkChanges(store,	() => app.quit());
	}
}