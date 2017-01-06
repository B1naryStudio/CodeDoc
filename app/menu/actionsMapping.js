const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');
import { createMarkdownFile, createProjectComments, createProjectDocs, openMarkdownFile, openProjectComments, 
		openProjectDocs, saveFile, saveFileAs, quitApp, openHomeScreen, saveAllFiles} from '../actions/modemanager';
import {convertMDtoHTML} from '../markdownConverter/markdownConverter';

export default function ActionsMapping(store) {

		console.log(store);
		
		postal.subscribe({
			channel: "topMenu",
			topic: "NewMarkdown",
			callback: function(data, envelope) {
				store.dispatch(createMarkdownFile());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "NewProjectComments",
			callback: function(data, envelope) {
				store.dispatch(createProjectComments());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "NewProjectDocs",
			callback: function(data, envelope) {
				store.dispatch(createProjectDocs());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "OpenMarkdown",
			callback: function(data, envelope) {
				store.dispatch(openMarkdownFile());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "OpenProjectComments",
			callback: function(data, envelope) {
				store.dispatch(openProjectComments());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "OpenProjectDocs",
			callback: function(data, envelope) {
				store.dispatch(openProjectDocs());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "SaveFile",
			callback: function(data, envelope) {
				store.dispatch(saveFile());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "SaveFileAs",
			callback: function(data, envelope) {
				store.dispatch(saveFileAs());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "SaveAllFiles",
			callback: function(data, envelope) {
				store.dispatch(saveAllFiles());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "Quit",
			callback: function(data, envelope) {
				store.dispatch(quitApp());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "Close",
			callback: function(data, envelope) {
				store.dispatch(openHomeScreen());
			}
		});

		postal.subscribe({
			channel: "topMenu",
			topic: "CurrentToHTML",
			callback: function(data, envelope) {
				store.dispatch(convertMDtoHTML());
			}
		});

}