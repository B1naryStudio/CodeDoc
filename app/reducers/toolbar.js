import { BOLD_TEXT } from '../actions/toolbar';

let initialState = ''

export default function toolbar(state = initialState, action) {
  switch (action.type) {
	case BOLD_TEXT:
	  return state = 'Bold Text';
	default:
	  return state = '';
  }
}