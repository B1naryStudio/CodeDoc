const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const dialog = electron.dialog;
const app = electron.app;
const postal = require('postal');
import { createNewFile, openDocumenting, openLineCommenting } from '../actions/modemanager';

export default function ActionsMapping(store) {

		console.log(store);
		
		postal.subscribe({
			channel: "filesOpen",
			topic: "openNew",
			callback: function(data, envelope) {
				store.dispatch(createNewFile());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "openForCommenting",
			callback: function(data, envelope) {
				store.dispatch(openDocumenting());
			}
		});

		postal.subscribe({
			channel: "filesOpen",
			topic: "openForDocumenting",
			callback: function(data, envelope) {
				store.dispatch(openLineCommenting());
			}
		});
}