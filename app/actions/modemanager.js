export const NEW_PROJECT = 'NEW_PROJECT';
export const OPEN_MARKDOWN = 'OPEN_MARKDOWN';
export const OPEN_PROJECT = 'OPEN_PROJECT';
export const NEW_MARKDOWN = 'NEW_MARKDOWN';
export const SET_TEXT_CHANGED = 'SET_TEXT_CHANGE';

import { routeActions } from 'redux-simple-router'

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
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

export function createProject(calledFromHomeScreen){
	console.log('---RUN LOGIC--- FOR CREATING NEW PROJECT');
	return {
		type: NEW_PROJECT
	}
}

export function openProject(calledFromHomeScreen){
	console.log('---RUN LOGIC--- FOR OPENING PROJECT');
	return {
		type: OPEN_PROJECT
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