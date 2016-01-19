export const CHANGE_TEXT = 'CHANGE_TEXT';
export const SELECT_TEXT = 'SELECT_TEXT';
export const ADD_BOLD_TEXT = 'ADD_BOLD_TEXT';
export const ADD_ITALIC_TEXT = 'ADD_ITALIC_TEXT';
export const ADD_HEADER = 'ADD_HEADER';
export const ADD_CODE_STYLE = 'ADD_CODE_STYLE';
export const ADD_BLOCK_QUOTE = 'ADD_BLOCK_QUOTE';
export const ADD_NUM_LIST = 'ADD_NUM_LIST';
export const ADD_SIMPLE_LIST = 'ADD_SIMPLE_LIST';
export const ADD_HORIZ_RULE = 'ADD_HORIZ_RULE';
export const ADD_LINK = 'ADD_LINK';
export const ADD_IMAGE_LINK = 'ADD_IMAGE_LINK';

export function changeText(text, cursorPosition) {
	return {
		type: CHANGE_TEXT,
		text: text,
		cursorPosition: cursorPosition
	};
}

export function selectText(text, cursorPosition) {
	return {
		type: SELECT_TEXT,
		text: text,
		cursorPosition: cursorPosition
	};
}

export function addBoldText() {
	return {
		type: ADD_BOLD_TEXT
	};
}

export function addItalicText() {
	return {
		type: ADD_ITALIC_TEXT
	};
}

export function addHeader(number) {
	return {
		type: ADD_HEADER,
		number: number
	};
}

export function addCodeStyle() {
	return {
		type: ADD_CODE_STYLE
	};
}

export function addBlockQuote() {
	return {
		type: ADD_BLOCK_QUOTE
	};
}

export function addNumList() {
	return {
		type: ADD_NUM_LIST
	};
}

export function addSimpleList() {
	return {
		type: ADD_SIMPLE_LIST
	};
}

export function addHorizRule() {
	return {
		type: ADD_HORIZ_RULE
	};
}

export function addLink(link) {
	return {
		type: ADD_LINK,
		link: link
	};
}

export function addImageLink(link) {
	return {
		type: ADD_IMAGE_LINK,
		link: link
	};
}