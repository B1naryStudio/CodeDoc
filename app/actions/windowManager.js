export const SHOW_CONTENT_WINDOW = 'SHOW_CONTENT_WINDOW';
export const SHOW_RESULT_WINDOW = 'SHOW_RESULT_WINDOW';

export function showContentWindow(){
	return {
		type: SHOW_CONTENT_WINDOW
	}
}

export function showResultWindow(){
	return {
		type: SHOW_RESULT_WINDOW
	}
}