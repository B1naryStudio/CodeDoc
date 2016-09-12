const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');

export class ActionsHandler {

	onNewMarkdown(fileNames) {
		postal.publish({
			channel: "filesOpen",
			topic: "NewMarkdown"
		});
	};

	onNewProjectComments(){
		postal.publish({
			channel: "filesOpen",
			topic: "NewProjectComments"
		});
	};

	onNewProjectDocs(){
		postal.publish({
			channel: "filesOpen",
			topic: "NewProjectDocs"
		});
	};

	onOpenMarkdown(fileNames) {
		postal.publish({
			channel: "filesOpen",
			topic: "OpenMarkdown"
		});
	};

	onOpenProjectComments(){
		postal.publish({
			channel: "filesOpen",
			topic: "OpenProjectComments"
		});
	};

	onOpenProjectDocs(){
		postal.publish({
			channel: "filesOpen",
			topic: "OpenProjectDocs"
		});
	};

	onSaveFile(){
		postal.publish({
			channel: "filesOpen",
			topic: "SaveFile"
		});
	};

	onSaveFileAs(){
		postal.publish({
			channel: "filesOpen",
			topic: "SaveFileAs"
		});
	};

	onQuit(){
		postal.publish({
			channel: "filesOpen",
			topic: "Quit"
		});
		//console.log('TRYIN\' to QUIT OUTTA HERE');
		//app.quit();
	};

	onFileClose(){
		postal.publish({
			channel: "filesOpen",
			topic: "Close"
		});
	};

}