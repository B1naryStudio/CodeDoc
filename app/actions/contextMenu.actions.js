export const SHOW_CONTEXT_MENU = 'SHOW_CONTEXT_MENU'
export const HIDE_CONTEXT_MENU = 'HIDE_CONTEXT_MENU'

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