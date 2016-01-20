import { HIDE_MODAL } from '../actions/modal-window';
import { SHOW_MODAL } from '../actions/main-window';

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