import { CHANGE_TEXT, SELECT_TEXT, ADD_BOLD_TEXT, ADD_ITALIC_TEXT, ADD_HEADER,
		ADD_CODE_STYLE, ADD_COMMENT, ADD_BLOCK_QUOTE, ADD_NUM_LIST, ADD_SIMPLE_LIST, ADD_HORIZ_RULE,
		LOAD_FILE, CLEAR_CURRENT_FILE, UPDATE_CURRENT_LINK } from '../actions/mainWindow';

import { ADD_LINK, ADD_IMAGE_LINK} from '../actions/modalWindow';

import {ToolbarService} from '../services/toolbarService';

let initialState = {
	mainWindowText: '',
	cursorPosition: {
		start: 0,
		end: 0
	}
}

export default function mainWindow(state = initialState, action) {
  switch (action.type) {
  	case LOAD_FILE:
  		console.log('File loaded');
		return Object.assign({}, state, {
			mainWindowText: action.text,
			currentLink: action.link,
			cursorPosition: action.cursorPosition,
			textChanged: false
		})
	case CHANGE_TEXT:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: action.text,
			cursorPosition: action.cursorPosition
		})
	case SELECT_TEXT:
		//var textChangedObject = onTextChanged();
		return Object.assign({}, state, {
			mainWindowText: action.text,
			cursorPosition: action.cursorPosition
		})
	case ADD_BOLD_TEXT:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addBold(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_ITALIC_TEXT:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addItalic(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_HEADER:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addHeader(state, action.number);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_CODE_STYLE:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addCodeStyle(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_COMMENT:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addComment(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_BLOCK_QUOTE:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addBlockQuote(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_NUM_LIST:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addNumList(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_SIMPLE_LIST:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addSimpleList(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_HORIZ_RULE:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addHorizRule(state);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_LINK:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addLink(state, action.link);
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case ADD_IMAGE_LINK:
		var textChangedObject = onTextChanged();
		var result = ToolbarService.addImageLink(state, action.link)
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: result.value,
			cursorPosition: result.cursorPosition
		})
	case CLEAR_CURRENT_FILE:
		return Object.assign({}, state, {
			mainWindowText: '',
			textChanged: '',
			currentLink: ''
		})
	case UPDATE_CURRENT_LINK:
		return Object.assign({}, state, {
			currentLink: state.link
		})
	default:
		return state
  }
}

function onTextChanged(){
	return {
		textChanged: true
	};
}
