export const OPEN_NEW_FILE = 'OPEN_NEW_FILE';
export const OPEN_DOCUMENTING = 'OPEN_DOCUMENTING';
export const OPEN_LINE_COMMENTING = 'OPEN_LINE_COMMENTING';
export const CREATE_NEW_FILE = 'CREATE_NEW_FILE';
export const SET_TEXT_CHANGED = 'SET_TEXT_CHANGE';

import { routeActions } from 'redux-simple-router'

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;

export  function createNewFile(calledFromHomeScreen){
	return (dispatch, getStore) => {
		const store = getStore();
		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/md-file-mode'));
		} else {
			if (store.mainWindow && store.mainWindow.textChanged){
				dialog.showMessageBox({
					type: 'none',
					buttons: ['Save', 'Cancel'],
					message: 'You have unsaved changes. Do you want to save them?'
				}, function(response){
					console.log('Opened button', response);
					if (response){
						return;
					} else {
						if (store.mainWindow && store.mainWindow.currentLink){
							fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
								if(err) console.error(err);
							});
							dispatch({ type: 'CLEAR_CURRENT_FILE'});
						} else {
							dialog.showSaveDialog({ 
								filters: [{ 
									name: 'Markdown', 
									extensions: ['md'] 
								}]
							}, function (filePath) {
								if (filePath.substr(-3,3) !== '.md'){
									filePath += '.md';
								}
								console.log('File saved to ', filePath);
								fs.writeFile(filePath, store.mainWindow.mainWindowText, function (err) {
									if(err) console.error(err);
								});
								dispatch({ type: 'CLEAR_CURRENT_FILE'});
							});
						}
					}
				});
			} else {
				dispatch(routeActions.push('/md-file-mode'));
			}
			console.log('Create new file call from top menu');
		}
		return dispatch({
			type: CREATE_NEW_FILE
		});
	}
}

export function openFile(calledFromHomeScreen){
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
			/* check opened files */
		}
	}
}

export function saveFile(calledFromHomeScreen){
	return (dispatch, getStore) => {
		let store = getStore();

		if (store.mainWindow && store.mainWindow.textChanged){
			if (store.mainWindow && store.mainWindow.currentLink){
				fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
					if(err) console.error(err);
				});
			} else {
				dialog.showSaveDialog({ 
					filters: [{ 
						name: 'Markdown', 
						extensions: ['md'] 
					}]
				}, function (filePath) {
					if (filePath.substr(-3,3) !== '.md'){
						filePath += '.md';
					}
					console.log('File saved to ', filePath);
					fs.writeFile(filePath, store.mainWindow.mainWindowText, function (err) {
						if(err) console.error(err);
						dispatch({ type: 'UPDATE_CURRENT_LINK', link: filePath });
					});
				});
			}
		}
	}
}

export  function openDocumenting(calledFromHomeScreen){
	console.log('Open for documenting');
	return {
		type: OPEN_DOCUMENTING
	}
}

export  function openLineCommenting(calledFromHomeScreen){
	console.log('Open for commenting');
	return {
		type: OPEN_LINE_COMMENTING
	}
}
