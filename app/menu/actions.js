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
		// console.log('ELECTRON', electron);
		// dialog.showOpenDialog({ 
		// 	filters: [{ 
		// 		name: 'Markdown', 
		// 		extensions: ['md'] 
		// 	}]
		// }, function (fileNames) {
		// 	if (fileNames === undefined) return;
		// 	var fileName = fileNames[0];
		// 	fs.readFile(fileName, 'utf-8', function (err, data) {
		// 		console.log('Get data from file');
		// 	});
		// });
	};

	onOpenCommenting(){
		postal.publish({
			channel: "filesOpen",
			topic: "openForCommenting"
		});
		// dialog.showSaveDialog({ 
		// 	filters: [{ 
		// 		name: 'Markdown', 
		// 		extensions: ['md'] 
		// 	}]
		// }, function (filePath) {
		// 	if (filePath.substr(-3,3) !== '.md'){
		// 		filePath += '.md';
		// 	}
		// 	var recentfiles = window.localStorage.getItem('recentfiles');
		// 	if (!recentfiles){
		// 		window.localStorage.setItem('recentfiles', JSON.stringify([filePath]));
		// 	} else {
		// 		var files = JSON.parse(recentfiles);
		// 		if (files.indexOf(filePath)=== -1){
		// 			files.push(filePath);
		// 			window.localStorage.setItem('recentfiles', JSON.stringify(files));
		// 		}
		// 	}
		// 	fs.writeFile(filePath, document.getElementById("markdown-container").value, function (err) {
		// 		if(err) console.error(err);
		// 	});
		// });
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