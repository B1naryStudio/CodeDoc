const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');

export class ActionsHandler {

	onOpenNew(fileNames) {
		postal.publish({
			channel: "filesOpen",
			topic: "openNew"
		});
	};

	onSaveFile(){
		postal.publish({
			channel: "filesOpen",
			topic: "saveFile"
		});
	}

	onCreateNew(fileNames) {
		postal.publish({
			channel: "filesOpen",
			topic: "createNew"
		});
	};

	onOpenCommenting(){
		postal.publish({
			channel: "filesOpen",
			topic: "openForCommenting"
		});
	};

	onOpenDocumenting(){
		postal.publish({
			channel: "filesOpen",
			topic: "openForDocumenting"
		});
	}

	onQuit(){
		app.quit();
	};

}