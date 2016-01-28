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

export  function createMarkdownFile(calledFromHomeScreen){
	return (dispatch, getStore) => {
		const store = getStore();
		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/md-file-mode'));
		} else {
			if (store.mainWindow && store.mainWindow.textChanged){
				dialog.showMessageBox({
					type: 'question',
					buttons: ['Yes', 'No', 'Cancel'],
					message: 'Do you want to save changes?'
				}, function(response) {
					console.log('Opened button', response);
					if (response === 2) {
						return;
					} else if(response === 1) {
						return dispatch({ type: 'CLEAR_CURRENT_FILE'});
					} else {
						if (store.mainWindow && store.mainWindow.currentLink){
							fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
								if(err) console.error(err);
							});
							dispatch({ type: 'CLEAR_CURRENT_FILE'});
						} else {
							dialog.showSaveDialog({ 
								title: 'Save File',
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
			console.log('Created new file call from top menu');
		}
		return dispatch({
			type: NEW_MARKDOWN
		});
	}
}

export function openMarkdownFile(calledFromHomeScreen){
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
			console.log('open markdown file');
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
					title: 'Save File',
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

export function createProject(calledFromHomeScreen){
	console.log('Create new project');
	return {
		type: NEW_PROJECT
	}
}

export function openProject(calledFromHomeScreen){
	console.log('Open project');
	return {
		type: OPEN_PROJECT
	}
}
