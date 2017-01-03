/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const postal = require('postal');

let mainWindow = null;


crashReporter.start();

if (process.env.NODE_ENV === 'development') {
	require('electron-debug')();
}


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 900,
		minHeight: 650
	});
	mainWindow.openDevTools();
	//mainWindow.setFullScreen(true);
	if (process.env.HOT) {
		mainWindow.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
	} else {
		mainWindow.loadURL(`file://${__dirname}/app/app.html`);
	}

	/*mainWindow.on('close', (e) => {
		if(true) {
			e.preventDefault();
		}
	});*/

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

});
