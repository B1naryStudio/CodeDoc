const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');
import { createMarkdownFile, createProject, openMarkdownFile, openProject, saveFile } from '../actions/modemanager';

export default function ActionsMapping(store) {

		console.log(store);
		
		postal.subscribe({
			channel: "filesOpen",
			topic: "NewMarkdown",
			callback: function(data, envelope) {
				store.dispatch(createMarkdownFile());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "NewProject",
			callback: function(data, envelope) {
				store.dispatch(createProject());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "OpenMarkdown",
			callback: function(data, envelope) {
				store.dispatch(openMarkdownFile());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "OpenProject",
			callback: function(data, envelope) {
				store.dispatch(openProject());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "SaveFile",
			callback: function(data, envelope) {
				store.dispatch(saveFile());
			}
		});
}