export const HIDE_MODAL = 'HIDE_MODAL';
export const ADD_LINK = 'ADD_LINK';
export const ADD_IMAGE_LINK = 'ADD_IMAGE_LINK';

export function hideModalWindow() {
	return {
		type: HIDE_MODAL
	};
}

export function addLink(link, modalType) {
	if (modalType == 'simpleLink'){
		return {
			type: ADD_LINK,
			link: link
		};
	} else if(modalType == 'imageLink'){
		return {
			type: ADD_IMAGE_LINK,
			link: link
		};
	}
}
