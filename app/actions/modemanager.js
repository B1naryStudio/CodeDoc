export const NEW_PROJECT_COMMENTS = 'NEW_PROJECT_COMMENTS';
export const NEW_PROJECT_DOCS = 'NEW_PROJECT_DOCS';
export const OPEN_MARKDOWN = 'OPEN_MARKDOWN';
export const OPEN_PROJECT_COMMENTS = 'OPEN_PROJECT_COMMENTS';
export const OPEN_PROJECT_DOCS = 'OPEN_PROJECT_DOCS';
export const NEW_MARKDOWN = 'NEW_MARKDOWN';
export const SET_TEXT_CHANGED = 'SET_TEXT_CHANGE';

import { routeActions } from 'redux-simple-router'

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;
const app = electron.app;

export function createMarkdownFile(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		let store = getStore();

		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/md-file-mode'));
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
	}
}

export function openMarkdownFile(calledFromHomeScreen) {
	return dispatch => {
		if (calledFromHomeScreen){
			dialog.showOpenDialog({ 
				filters: [{ 
					name: 'Markdown', 
					extensions: ['md'] 
				}]
			}, function (fileNames) {
				if (fileNames === undefined) return;
				var fileName = fileNames[0];
				fs.readFile(fileName, 'utf-8', function (err, data) {
					dispatch({ type: 'LOAD_FILE', text: data, link: fileName });
					dispatch(routeActions.push('/md-file-mode'));
				});
			});
		} else {
			console.log('---RUN LOGIC--- FOR OPENING .MD FILE');
		}
	}
}

export function saveFile() {
	return (dispatch, getStore) => {
		let store = getStore();

		if (store.mainWindow.textChanged) {
			if (store.mainWindow.currentLink){
				fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
					if(err) console.error(err);
					else {
						// set changes to false
						console.log('---RUN LOGIC--- FOR SETTING \'FILE CHANGED\' STATE TO FALSE');
					}
				});
			} else {
				saveFileDialogBox(
					store,
					function(filePath) {
						dispatch({ type: 'UPDATE_CURRENT_LINK', link: filePath });
					}
				);
			}
		} else {
			console.log('NO FILE OPENED OR NO CHANGES MADE');
		}
	}
}

export function createProjectComments(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		let store = getStore();

		if (calledFromHomeScreen){
			dialog.showOpenDialog({ 
				properties: ['openDirectory', 'createDirectory']
			}, function (folderPath) {
				console.log(folderPath[0]);
				var tree = getFileTree(folderPath[0]);
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

export function openProjectComments(calledFromHomeScreen) {
	console.log('---RUN LOGIC--- FOR OPENING PROJECT comms');
	return {
		type: OPEN_PROJECT_COMMENTS
	}
}

export function createProjectDocs(calledFromHomeScreen) {
	console.log('---RUN LOGIC--- FOR CREATING NEW PROJECT docs');
	return {
		type: NEW_PROJECT_DOCS
	}
}

export function openProjectDocs(calledFromHomeScreen) {
	console.log('---RUN LOGIC--- FOR OPENING PROJECT docs');
	return {
		type: OPEN_PROJECT_DOCS
	}
}

export function quitApp() {
	return (dispatch, getStore) => {
		let store = getStore();

		if (store.mainWindow && store.mainWindow.textChanged) {
			saveChangesConfirmDialogBox(
				store,
				function() {
					return app.quit();
				}
			);
		} else {
			return app.quit();
		}
	}
}

function saveChangesConfirmDialogBox(store, next) {
	dialog.showMessageBox({
		type: 'question',
		buttons: ['Yes', 'No', 'Cancel'],
		message: 'Do you want to save changes to current file?'
	}, function(response) {
		if (response === 2) {
			return;
		} else if(response === 1) {
			return next();
		} else if(response === 0) {
			if (store.mainWindow.currentLink) {
				fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
					if(err) console.error(err);
					else {
						// set changes to false
						console.log('---RUN LOGIC--- FOR SETTING \'FILE CHANGED\' STATE TO FALSE');
					}
				});
				return next();
			} else {
				return saveFileDialogBox(store, next);
			}
		}
	});
}

function saveFileDialogBox(store, next) {
	dialog.showSaveDialog({ 
		title: 'Save File',
		filters: [{ 
			name: 'Markdown', 
			extensions: ['md'] 
		}]
	}, function (filePath) {
		if(filePath) {
			if (filePath.substr(-3,3) !== '.md'){
				filePath += '.md';
			}
			fs.writeFile(filePath, store.mainWindow.mainWindowText, function (err) {
				if(err) console.error(err);
				else {
					// set changes to false
					console.log('---RUN LOGIC--- FOR SETTING \'FILE CHANGED\' STATE TO FALSE');
				}
			});
			return next();
		} else {
			return;
		}
	});
}

function getFileTree(filename) {
	var stats = fs.lstatSync(filename),
		tree = {
			path: filename,
			module: path.basename(filename)
		};
	if (stats.isDirectory()) {
		tree.children = fs.readdirSync(filename).map(function(child) {
			return getFileTree(filename + '/' + child);
		});
	} else {
		tree.leaf = true;
	}
	return tree;
}