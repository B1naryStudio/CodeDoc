const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;

import {FilesService} from './filesService';
import {guid} from './guid';

export var CheckChangesService = {
    // openProjectTree: openProjectTree,
    // createFile: createFile,
    // openFile: openFile,
    // saveFile: saveFile,
    // addContentFileToConfig: addContentFileToConfig,
    // addContentTreeToConfig: addContentTreeToConfig
	checkChanges: checkChanges,
	getFileTree: getFileTree,
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

	//TODO check for comment project
	// if(store.commentWindow){
	// 	if(checkCommentProjectChange(store)){

	// 	}
	// 	//save comment project FilesService
	// }
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

function getFileTree(folderPath, contentTree, ignore = [], base = folderPath, key = 0) {
	let stats = fs.lstatSync(folderPath),
			tree = {
				path: folderPath,
				hasDocs: false,
				name: path.basename(folderPath),
				key: key
			};
	let docsPath = path.join(base, '.codedoc', folderPath.substring(base.length, folderPath.length - (stats.isDirectory() ? 0 : path.basename(folderPath).length)), (path.basename(folderPath) + '.md'));
	try {
		fs.accessSync(docsPath, fs.F_OK);
		tree.hasDocs = true;
		tree.docsPath = docsPath;
	} catch (e) {
		tree.hasDocs = false;
		tree.docsPath = docsPath;
		if(tree.name.substr(-3) === '.md'){
			tree.docsPath = tree.path;
			delete tree.path;
		}
	}
	if (stats.isDirectory()) {
		let filteredChildren = fs.readdirSync(folderPath).filter(function(child) {
			return !_.find(ignore, function(item) {
				return item === child;
			});
		});
		tree.children = filteredChildren.map(function(child) {
			let newKey = guid();
			if(child.substr(-3) === '.md') {
				contentTree.push({docsPath: path.join(folderPath, child), name: child, key: newKey});
			}
			return getFileTree(path.join(folderPath, child), contentTree, ignore, base, newKey);
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

 function checkProjectChange(store){
	if(store.mainWindow.textChanged) return true;
	let openedFiles = store.projectWindow.openedFiles;
	if(openedFiles.length < 1) return false;
	for(let i=0; i < openedFiles.length; i++){
	 	if(openedFiles[i].mainWindow.textChanged) return true;
	}
	return false;
}