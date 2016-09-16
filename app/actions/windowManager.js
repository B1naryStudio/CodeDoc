export const SHOW_CODE_WINDOW = 'SHOW_CODE_WINDOW';
export const SHOW_RESULT_WINDOW = 'SHOW_RESULT_WINDOW';

export function showCodeWindow(){
	return {
		type: SHOW_CODE_WINDOW
	}
}

export function showResultWindow(){
	return {
		type: SHOW_RESULT_WINDOW
	}
}