import {treeSearch} from '../services/treeSearch'
export const SHOW_CONTEXT_MENU = 'SHOW_CONTEXT_MENU'
export const HIDE_CONTEXT_MENU = 'HIDE_CONTEXT_MENU'


export function treeContextMenu(key, x, y){
    return (dispatch, getStore)=>{
        var store = getStore().projectWindow.tree;
        let node = treeSearch(store, key);
        let action = {
            type: SHOW_CONTEXT_MENU,
            x, 
            y
        };
        if(node.children){
            action.target = 'tree-folder'
        } else{
            action.target = 'tree-item'
        }
        dispatch(action);
    };
}

export function showContext(target, x, y){
    return {
        type: SHOW_CONTEXT_MENU,
        target,
        x,
        y
    };
}
export function hideContext(){
    return {
        type: HIDE_CONTEXT_MENU
    };
}