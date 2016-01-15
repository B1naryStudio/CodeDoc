import { OPEN_NEW_FILE, OPEN_DOCUMENTING, OPEN_LINE_COMMENTING } from '../actions/modemanager';

export default function modemanager(state = 0, action) {
  switch (action.type) {
  	case OPEN_LINE_COMMENTING:
  		return state;
    default:
      return state;
  }
}
