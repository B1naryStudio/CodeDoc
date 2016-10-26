import {SHOW_CONTEXT_MENU, HIDE_CONTEXT_MENU} from '../actions/contextMenu.actions'
let initialState = {
    isVisible: false,
    target: null,
    x: 0,
    y: 0
}

export default function contextMenu(state=initialState, action){
    switch(action.type)
    {
        case SHOW_CONTEXT_MENU: {
            console.log(SHOW_CONTEXT_MENU)
            return Object.assign({}, state, {
                isVisible: true,
                x: action.x,
                y: action.y,
                target: action.target
            });
        }
        case HIDE_CONTEXT_MENU: {
            console.log(HIDE_CONTEXT_MENU);
            return Object.assign({}, state, {
                isVisible: false
            });
        }
        default: return initialState;
    }
}