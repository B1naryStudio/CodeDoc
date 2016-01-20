import { HIDE_MODAL } from '../actions/modalWindow';
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
			modalType: action.modalType
		})
	case HIDE_MODAL:
		return Object.assign({}, state, {
			showModal: false
		})
	default:
	  return state;
  }
}