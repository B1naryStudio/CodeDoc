export const NEW_PROJECT_COMMENTS = 'NEW_PROJECT_COMMENTS';
export const NEW_PROJECT_DOCS = 'NEW_PROJECT_DOCS';
export const OPEN_MARKDOWN = 'OPEN_MARKDOWN';
export const OPEN_PROJECT_COMMENTS = 'OPEN_PROJECT_COMMENTS';
export const OPEN_PROJECT_DOCS = 'OPEN_PROJECT_DOCS';
export const NEW_MARKDOWN = 'NEW_MARKDOWN';
export const SET_TEXT_CHANGED = 'SET_TEXT_CHANGE';

import { routeActions } from 'redux-simple-router'
import {FilesService} from '../services/filesService';

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;
const app = electron.app;

export function createMarkdownFile(calledFromHomeScreen = false) {
	return (dispatch, getStore) => {
		let store = getStore();
		debugger;
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
		debugger;
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
				fs.writeFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, function (err) {
					if(err) console.error(err);
					else {
						// set changes to false
						dispatch({type: SET_TEXT_CHANGED, payload: {textChanged: false}})
						//console.log('---RUN LOGIC--- FOR SETTING \'FILE CHANGED\' STATE TO FALSE');						
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
			var tree = getFileTree(folderPath[0], docsConfig.ignore);
			tree.toggled = true;
			let dir = path.join(tree.path ,'.codedoc');
			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}

			fs.writeFile(path.join(dir,'docsConfig.json'), JSON.stringify(docsConfig), function (err) {
				if(err) console.error(err);
				else {
					console.log('default config created');
				}
			});

			dispatch({ type: 'TREE_LOAD', payload: {tree: tree}});
			dispatch(routeActions.push('/project-docs-mode'));
		});
		//} else {
		//	console.log('---RUN LOGIC--- FOR createProjectComments');
		//}
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

export function openProjectDocs(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		if (!calledFromHomeScreen) {
			console.log('---RUN LOGIC--- FOR SETTING \'FILE CHANGED\' STATE TO FALSE');
		}

		dialog.showOpenDialog({ 
				properties: ['openDirectory', 'createDirectory']
			}, function (folderPath) {
				console.log(folderPath[0]);


				FilesService.openProjectTree(folderPath[0], (tree) => {
					dispatch({ type: 'TREE_LOAD', payload : {tree: tree} });
					dispatch(routeActions.push('/project-docs-mode'));
				});
			});
	};
	/*return {
		type: OPEN_PROJECT_DOCS
	}*/
}

export function openHomeScreen(calledFromHomeScreen) {
	return (dispatch, getStore) => {
		let store = getStore();

		checkChanges(store,	function() {
			dispatch({ type: 'CLEAR_CURRENT_FILE'});
			dispatch(routeActions.push('/'));});
	}
}

export function quitApp() {
	return (dispatch, getStore) => {
		let store = getStore();
		checkChanges(store,	() => app.quit());
	}
}

function checkChanges(store, next){
	if (store.mainWindow && store.mainWindow.textChanged) {
			saveChangesConfirmDialogBox(store, next);
		} else {
			return next();
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

function getFileTree(folderPath, ignore = [], base = folderPath) {
	let stats = fs.lstatSync(folderPath),
			tree = {
				path: folderPath,
				hasDocs: false,
				name: path.basename(folderPath)
			};
	let docsPath = path.join(base, '.codedoc', folderPath.substring(base.length, folderPath.length - (stats.isDirectory() ? 0 : path.basename(folderPath).length)), (path.basename(folderPath) + '.md'));
	try {
		fs.accessSync(docsPath, fs.F_OK);
		tree.hasDocs = true;
		tree.docsPath = docsPath;
	} catch (e) {
		tree.hasDocs = false;
		tree.docsPath = docsPath;
	}
	if (stats.isDirectory()) {
		let filteredChildren = fs.readdirSync(folderPath).filter(function(child) {
			return !_.find(ignore, function(item) {
				return item === child;
			});
		});
		tree.children = filteredChildren.map(function(child) {
			return getFileTree(path.join(folderPath, child), ignore, base);
		});
		tree.children.sort(function(a, b) {
			let A = a.children ? 1 : 0;
			let B = b.children ? 1 : 0;
			if ((B - A) === 0) {
				return (b.name > a.name) ? -1 : 1;
			}
			return B - A;
		});
	}
	return tree;
}

/*function getFileTree(filename) {
	var stats = fs.lstatSync(filename),
		tree = {
			path: filename,
			name: path.basename(filename)
		};
	if (stats.isDirectory()) {
		tree.children = fs.readdirSync(filename).map(function(child) {
			return getFileTree(filename + '/' + child);
		});
		tree.children.sort(function(a, b) {
			let A = a.children ? 1 : 0;
			let B = b.children ? 1 : 0;
			if ((B - A) === 0) {
				return (b.name > a.name) ? -1 : 1;
			}
			return B - A;
		})
	}
	return tree;
}
*/
