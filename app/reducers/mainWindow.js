import { CHANGE_TEXT, SELECT_TEXT, ADD_BOLD_TEXT, ADD_ITALIC_TEXT, ADD_HEADER,
		ADD_CODE_STYLE, ADD_BLOCK_QUOTE, ADD_NUM_LIST, ADD_SIMPLE_LIST, ADD_HORIZ_RULE,
		LOAD_FILE, CLEAR_CURRENT_FILE, UPDATE_CURRENT_LINK } from '../actions/mainWindow';

import { ADD_LINK, ADD_IMAGE_LINK} from '../actions/modalWindow';

import {ToolbarService} from '../services/toolbarService';

let initialState = {
	mainWindowText: '',
	cursorPosition: 0

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
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: action.text,
			cursorPosition: action.cursorPosition
		})
	case ADD_BOLD_TEXT:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject,  state, {
			mainWindowText: ToolbarService.addBold(state)
		})
	case ADD_ITALIC_TEXT:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject,  state, {
			mainWindowText: ToolbarService.addItalic(state)
		})
	case ADD_HEADER:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addHeader(state, action.number)
		})
	case ADD_CODE_STYLE:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addCodeStyle(state)
		})
	case ADD_BLOCK_QUOTE:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addBlockQuote(state)
		})
	case ADD_NUM_LIST:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addNumList(state)
		})
	case ADD_SIMPLE_LIST:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addSimpleList(state)
		})
	case ADD_HORIZ_RULE:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addHorizRule(state)
		})
	case ADD_LINK:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addLink(state, action.link)
		})
	case ADD_IMAGE_LINK:
		var textChangedObject = onTextChanged();
		return Object.assign({}, textChangedObject, state, {
			mainWindowText: ToolbarService.addImageLink(state, action.link)
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
