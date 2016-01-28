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

	onNewProject(){
		postal.publish({
			channel: "filesOpen",
			topic: "NewProject"
		});
	}

	onOpenMarkdown(fileNames) {
		postal.publish({
			channel: "filesOpen",
			topic: "OpenMarkdown"
		});
	};

	onOpenProject(){
		postal.publish({
			channel: "filesOpen",
			topic: "OpenProject"
		});
	};

	onSaveFile(){
		postal.publish({
			channel: "filesOpen",
			topic: "SaveFile"
		});
	}

	onQuit(){
		app.quit();
	};

}