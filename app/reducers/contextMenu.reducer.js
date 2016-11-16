import { SHOW_CONTEXT_MENU, HIDE_CONTEXT_MENU, ADD_FILE_TO_FOLDER } from '../actions/contextMenu.actions'
let initialState = {
  isVisible: false,
  x: 0,
  y: 0,
  target: {
    type: undefined
  }
}

export default function contextMenu(state = initialState, action) {
  switch (action.type) {
    case SHOW_CONTEXT_MENU: {
      return Object.assign({}, state, {
        isVisible: true,
        x: action.x,
        y: action.y,
        target: action.target
      });
    }
    case HIDE_CONTEXT_MENU: {
      return Object.assign({}, state, {
        isVisible: false,
        value: ""
      });
    }
    default:
      return state;
  }
}
