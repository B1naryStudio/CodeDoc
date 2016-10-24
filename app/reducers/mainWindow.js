import { CHANGE_TEXT, SELECT_TEXT, UNDO_ACTION, REDO_ACTION, ADD_BOLD_TEXT, ADD_ITALIC_TEXT, ADD_HEADER,
		ADD_CODE_STYLE, ADD_COMMENT, ADD_BLOCK_QUOTE, ADD_NUM_LIST, ADD_SIMPLE_LIST, ADD_HORIZ_RULE,
		LOAD_FILE, CLEAR_CURRENT_FILE, UPDATE_CURRENT_LINK, LOAD_OPENED_FILE, LOAD_CODE_FILE } from '../actions/mainWindow';

import { ADD_LINK, ADD_IMAGE_LINK} from '../actions/modalWindow';

import {ToolbarService} from './services/toolbarService';

let initialState = {
	mainWindowText: '',
	mainWindowCode: '',
	textChanged: false,
	cursorPosition: {
		start: 0,
		end: 0
	},
	pastStates: [],
	futureStates: []
}


const remote = require('remote');
const electron =  remote.require('electron');
//const fs = require('fs');
//const path = require('path');
const app = electron.app;

export default function mainWindow(state = initialState, action) {
	switch (action.type) {
		case LOAD_FILE:
			//app.addRecentDocument(action.link);
			saveFilesToStorage(action.link);
			console.log('File loaded');
		return Object.assign({}, state, {
			mainWindowText: action.text,
			currentLink: action.link,
			textChanged: false,
			pastStates: [],
			futureStates: []
		})
		case LOAD_OPENED_FILE:
		return Object.assign({}, state, action.payload.mainWindow)
		case CHANGE_TEXT:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = {};
			if (!state.pastStates.length || (state.cursorPosition.start !== state.cursorPosition.end)) {
				updatedStatesHistory = storePastState(state);
			} else {
				let prevState = state.pastStates[state.pastStates.length - 1];
				if ((Math.abs(state.mainWindowText.length - prevState.mainWindowText.length) > 4) || ((prevState.mainWindowText.length - prevState.cursorPosition.end) !== (state.mainWindowText.length - state.cursorPosition.end))) {
					updatedStatesHistory = storePastState(state);
				}
			}
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: action.text,
				cursorPosition: action.cursorPosition
			}, updatedStatesHistory)
		case SELECT_TEXT:
			return Object.assign({}, state, {
				mainWindowText: action.text,
				cursorPosition: action.cursorPosition
			})
		case ADD_BOLD_TEXT:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addBold(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case UNDO_ACTION:
			var textChangedObject = onTextChanged();
			var result = ToolbarService.undoAction(state);
			return Object.assign({}, state, result)
		case REDO_ACTION:
			var textChangedObject = onTextChanged();
			var result = ToolbarService.redoAction(state);
			return Object.assign({}, state, result)
		case ADD_ITALIC_TEXT:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addItalic(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_HEADER:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addHeader(state, action.number);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_CODE_STYLE:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addCodeStyle(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_COMMENT:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addComment(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_BLOCK_QUOTE:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addBlockQuote(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_NUM_LIST:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addNumList(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_SIMPLE_LIST:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addSimpleList(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_HORIZ_RULE:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addHorizRule(state);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_LINK:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addLink(state, action.link);
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case ADD_IMAGE_LINK:
			var textChangedObject = onTextChanged();
			var updatedStatesHistory = storePastState(state);
			var result = ToolbarService.addImageLink(state, action.link)
			return Object.assign({}, state, textChangedObject, {
				mainWindowText: result.value,
				cursorPosition: result.cursorPosition
			}, updatedStatesHistory)
		case CLEAR_CURRENT_FILE:
			return Object.assign({}, state, {
				mainWindowText: '',
				mainWindowCode: '',
				textChanged: false,
				currentLink: '',
				pastStates: [],
				futureStates: []
			})
		case UPDATE_CURRENT_LINK:
			return Object.assign({}, state, {
				currentLink: action.payload.link,
				textChanged: false
			})
		case LOAD_CODE_FILE:
			return Object.assign({}, state, {
				mainWindowCode: action.payload.text
			})
		default:
			return state
	}
}

function onTextChanged() {
	return {
		textChanged: true
	};
}

function storePastState(state) {
	let currentState = {
		mainWindowText: state.mainWindowText,
		cursorPosition: state.cursorPosition
	};
	let pastStates = state.pastStates;
	pastStates.push(currentState);
	if (pastStates.length > 15) {
		pastStates.shift();
	}
	let futureStates = [];
	return {
		pastStates,
		futureStates
	};
}

function saveFilesToStorage(file){
	if (localStorage.recentDocuments) {
		let files = JSON.parse(localStorage.recentDocuments);
		let index = files.indexOf(file);
		if (index !== -1) {
			files.splice(index, 1);
		}
		files.unshift(file);
		let jsonfile = JSON.stringify(files);
		localStorage.setItem("recentDocuments", jsonfile);
	} else{
		let jsonfile = JSON.stringify([file]);
		localStorage.setItem("recentDocuments", jsonfile);
	}

	//localStorage.setItem("recentDocuments",)
}
