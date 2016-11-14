import {
  treeSearch
} from '../services/treeSearch'
import {
  FilesService
} from '../services/filesService'
import {
  guid
} from '../services/guid';
export const SHOW_CONTEXT_MENU = 'SHOW_CONTEXT_MENU'
export const HIDE_CONTEXT_MENU = 'HIDE_CONTEXT_MENU'
export const ADD_FILE_TO_FOLDER = 'ADD_FILE_TO_FOLDER'



export function treeContextMenu(key, x, y) {
  return (dispatch, getStore) => {
    var store = getStore().projectWindow.tree;
    let node = treeSearch(store, key);
    let action = {
      type: SHOW_CONTEXT_MENU,
      x,
      y,
      target: {
        path: node.path,
        hasMD: node.hasDocs,
        key
      }
    };
    if (node.children) {
      action.target.type = 'tree-folder'
    } else {
      action.target.type = 'tree-item'
    }
    dispatch(action);
  };
}

export function createFileInFolder() {
  return (dispatch, getStore) => {
    var store = getStore().contextMenu.target;
    if (store.hasMD) {
      alert("Selected folder already has Markdown file");
    } else {
      FilesService.createFile(store.path + "/README.md", function (err) {
        if (err) console.log(err);
        else {
          dispatch({
            type: ADD_FILE_TO_FOLDER,
            key: guid(),
            parentKey: store.key,
            path: store.path+"/README.md",
            hasDocs: false,
            name: "README.md"
          });
        }
      });
   }
  }
}

export function showContext(target, x, y) {
  return {
    type: SHOW_CONTEXT_MENU,
    target,
    x,
    y
  };
}
export function hideContext() {
  return {
    type: HIDE_CONTEXT_MENU
  };
}
