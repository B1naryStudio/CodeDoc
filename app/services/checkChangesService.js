const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;

import {FilesService} from './filesService';

export var CheckChangesService = {
	checkChanges: checkChanges,
	checkProjectChange: checkProjectChange,
	saveFileDialogBox: saveFileDialogBox,
	checkCurrentFile: checkCurrentFile
}



function checkChanges(store, next){

	if(store.projectWindow.tree.path){
		if(checkProjectChange(store)){
			saveChangesConfirmDialogBox('Do you want to save changes to current project?',
				()=>{
					store.projectWindow.openedFiles.forEach((item, index) => {
						console.log('select file', index);
						console.log('item.mainWindow.textChanged ->', item.mainWindow.textChanged);
						if(item.mainWindow.textChanged){
							FilesService.saveFile(item.mainWindow.currentLink, item.mainWindow.mainWindowText);
						}
					});
					if(store.mainWindow.textChanged){
						FilesService.saveFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, next);
					}
					next();
				},
				next);
			return;
		} else {
			return next();
		}
	}

	checkCurrentFile(store, next);
}

function checkCurrentFile(store, next){
	if (store.mainWindow.textChanged) {
			saveChangesConfirmDialogBox('Do you want to save changes to current file?',
				() => {
					if (store.mainWindow.currentLink) {
						FilesService.saveFile(store.mainWindow.currentLink, store.mainWindow.mainWindowText, next);
					} else {
						return saveFileDialogBox(store, next);
					}
				},
				next);
			return;
	} else {
		return next();
	}
}

function saveChangesConfirmDialogBox(message, callbackOk, callbackNo) {
	dialog.showMessageBox({
		type: 'question',
		buttons: ['Yes', 'No', 'Cancel'],
		message: message
	}, function(response) {
		if (response === 2) {
			return;
		} else if(response === 1) {
			return callbackNo();
		} else if(response === 0) {
			callbackOk();
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
			FilesService.saveFile(filePath, store.mainWindow.mainWindowText, next);
		} else {
			return;
		}
	});
}

 function checkProjectChange(store){
	if(store.mainWindow.textChanged) return true;
	let openedFiles = store.projectWindow.openedFiles;
	if(openedFiles.length < 1) return false;
	for(let i=0; i < openedFiles.length; i++){
	 	if(openedFiles[i].mainWindow.textChanged) return true;
	}
	return false;
}