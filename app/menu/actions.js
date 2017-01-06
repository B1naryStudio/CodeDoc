const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');

export class ActionsHandler {

	onNewMarkdown(fileNames) {
		postal.publish({
			channel: "topMenu",
			topic: "NewMarkdown"
		});
	};

	onNewProjectComments(){
		postal.publish({
			channel: "topMenu",
			topic: "NewProjectComments"
		});
	};

	onNewProjectDocs(){
		postal.publish({
			channel: "topMenu",
			topic: "NewProjectDocs"
		});
	};

	onOpenMarkdown(fileNames) {
		postal.publish({
			channel: "topMenu",
			topic: "OpenMarkdown"
		});
	};

	onOpenProjectComments(){
		postal.publish({
			channel: "topMenu",
			topic: "OpenProjectComments"
		});
	};

	onOpenProjectDocs(){
		postal.publish({
			channel: "topMenu",
			topic: "OpenProjectDocs"
		});
	};

	onSaveFile(){
		postal.publish({
			channel: "topMenu",
			topic: "SaveFile"
		});
	};

	onSaveFileAs(){
		postal.publish({
			channel: "topMenu",
			topic: "SaveFileAs"
		});
	};

	onSaveAllFiles(){
		postal.publish({
			channel: "topMenu",
			topic: "SaveAllFiles"
		});
	};

	onQuit(){
		postal.publish({
			channel: "topMenu",
			topic: "Quit"
		});
		//console.log('TRYIN\' to QUIT OUTTA HERE');
		//app.quit();
	};

	onFileClose(){
		postal.publish({
			channel: "topMenu",
			topic: "Close"
		});
	};

	onCurrentToHTML(){
		postal.publish({
			channel: "topMenu",
			topic: "CurrentToHTML"
		});
	};

}