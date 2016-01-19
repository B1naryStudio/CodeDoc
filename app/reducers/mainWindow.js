import { CHANGE_TEXT, SELECT_TEXT, ADD_BOLD_TEXT, ADD_ITALIC_TEXT, ADD_HEADER,
		ADD_CODE_STYLE, ADD_BLOCK_QUOTE, ADD_NUM_LIST, ADD_SIMPLE_LIST, ADD_HORIZ_RULE,
		ADD_LINK, ADD_IMAGE_LINK} from '../actions/main-window';

import {ToolbarService} from '../services/toolbarService';

let initialState = {}

export default function mainWindow(state = initialState, action) {
  switch (action.type) {
	case CHANGE_TEXT:
		return Object.assign({}, state, {
			mainWindowText: action.text,
			cursorPosition: action.cursorPosition
		})
	case SELECT_TEXT:
		return Object.assign({}, state, {
			mainWindowText: action.text,
			cursorPosition: action.cursorPosition
		})
	case ADD_BOLD_TEXT:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addBold(state)
		})
	case ADD_ITALIC_TEXT:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addItalic(state)
		})
	case ADD_HEADER:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addHeader(state, action.number)
		})
	case ADD_CODE_STYLE:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addCodeStyle(state)
		})
	case ADD_BLOCK_QUOTE:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addBlockQuote(state)
		})
	case ADD_NUM_LIST:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addNumList(state)
		})
	case ADD_SIMPLE_LIST:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addSimpleList(state)
		})
	case ADD_HORIZ_RULE:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addHorizRule(state)
		})
	case ADD_LINK:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addLink(state, action.link)
		})
	case ADD_IMAGE_LINK:
		return Object.assign({}, state, {
			mainWindowText: ToolbarService.addImageLink(state, action.link)
		})
	default:
		return state
  }
}
