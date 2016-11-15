import { HIDE_MODAL, SET_MODAL_VALUE } from '../actions/modalWindow';
import { SHOW_MODAL } from '../actions/mainWindow';

let initialState = {
	showModal: false,
	modalType: ''
};

export default function modalProperties(state = initialState, action) {
	switch (action.type) {
		case SHOW_MODAL:
			return Object.assign({}, state, {
				showModal: true,
				modalType: action.modalType,
				value: action.value
			})
		case HIDE_MODAL:
			return Object.assign({}, state, {
				showModal: false
			})
		case SET_MODAL_VALUE:
			return Object.assign({}, state, {
				value: action.value
			});
		default:
			return state;
	}
}
