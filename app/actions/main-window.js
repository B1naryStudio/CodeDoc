export const CHANGE_TEXT = 'CHANGE_TEXT';

export function changeText(text) {
	return {
		type: CHANGE_TEXT,
		text: text
	};
}