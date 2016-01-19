export const OPEN_NEW_FILE = 'OPEN_NEW_FILE';
export const OPEN_DOCUMENTING = 'OPEN_DOCUMENTING';
export const OPEN_LINE_COMMENTING = 'OPEN_LINE_COMMENTING';
export const CREATE_NEW_FILE = 'CREATE_NEW_FILE';

import { routeActions } from 'redux-simple-router'

const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;

export  function createNewFile(calledFromHomeScreen){
	return dispatch => {
		if (calledFromHomeScreen) {
			dispatch(routeActions.push('/md-file-mode'));
		} else {
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
					dispatch({ type: OPEN_NEW_FILE, text: data });
					dispatch(routeActions.push('/md-file-mode'));
				});
			});
		} else {

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
