import { treeSearch } from '../services/treeSearch'
import { FilesService } from '../services/filesService'
import { guid } from '../services/guid';
import { dialog } from "electron"
import { SHOW_MODAL } from '../actions/mainWindow';
import { HIDE_MODAL } from '../actions/modalWindow';
export const SHOW_CONTEXT_MENU = 'SHOW_CONTEXT_MENU'
export const HIDE_CONTEXT_MENU = 'HIDE_CONTEXT_MENU'
export const ADD_FILE_TO_FOLDER = 'ADD_FILE_TO_FOLDER'
export const DELETE_FILE_FROM_FOLDER = 'DELETE_FILE_FROM_FOLDER'
export const RENAME_ITEM = 'RENAME_ITEM'

export function contentTreeContextMenu(key, x, y) {
  return (dispatch, getStore) => {
    let store = getStore().projectWindow.contentTree.tree;
    let node;
    for (let i = 0; i < store.length; i++) {
      if (store[i].key == key.slice(0, -1)) {
        node = store[i];
        break;
      }
    }
    let action = {
      type: SHOW_CONTEXT_MENU,
      x,
      y,
      target: {
        path: node.path,
        key,
        type: "con-tree-item",
        docsPath: node.docsPath
      }
    };
    dispatch(action);
  };
}


export function treeContextMenu(key, x, y) {
  return (dispatch, getStore) => {
    let store = getStore().projectWindow.tree;
    let node = treeSearch(store, key);
    let action = {
      type: SHOW_CONTEXT_MENU,
      x,
      y,
      target: {
        path: node.path,
        hasDocs: node.hasDocs ? true : false,
        hasCom: node.hasCom ? true : false,
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
export function deleteFileFromFolder(type) {
  return (dispatch, getStore) => {
    let store = getStore().contextMenu.target;
    let file;
    if (type == "MD") {
      file = "README.md";
    } else {
      file = "COMMENTS.txt";
    }
    FilesService.deleteFile(store.path + "/" + file, function(err) {
      if (err) {
        console.log(err);
      } else {
        dispatch({
          type: DELETE_FILE_FROM_FOLDER,
          key: store.key,
          hasDocs: (type == "MD" ? false : true),
          hasCom: (type == "CMT" ? false : true),
          file
        })
      }
    })
  }
}
export function createFileInFolder(type) {
  return (dispatch, getStore) => {
    let store = getStore().contextMenu.target;
    let file;
    if (type == "MD") {
      file = "README.md";
    } else {
      file = "COMMENTS.txt";
    }
    FilesService.createFile(store.path + "/" + file, function(err) {
      if (err) console.log(err);
      else {
        dispatch({
          type: ADD_FILE_TO_FOLDER,
          key: guid(),
          parentKey: store.key,
          path: store.path + "/" + file,
          hasDocs: (type == "MD" ? true : false),
          hasCom: (type == "CMT" ? true : false),
          name: file
        });
      }
    });
  }
}

export function renameContentItem() {
  return (dispatch, getStore) => {
    let store = getStore().contextMenu.target;
    let oldName = store.docsPath.substring(store.docsPath.lastIndexOf("/") + 1, store.docsPath.length);
    let newName = getStore().modalWindow.value;
    if (newName) {
      if (oldName == newName) {
        alert("Enter new name");
      } else {
        FilesService.renameFile(store.docsPath, newName, function(err) {
          if (!err) {
            dispatch({
              type: HIDE_MODAL
            });


            let node;
            let contentTree = getStore().projectWindow.contentTree.tree;
            let openedFiles = getStore().projectWindow.openedFiles;
            let activeFile = getStore().projectWindow.activeFile;
            //update in content tree
            let key = store.key.substring(0, store.key.length - 1);
            for (let i = 0; i < contentTree.length; i++) {
              if (contentTree[i].key == key) {
                node = contentTree[i];
              }
            }

            node.name = newName;
            let beforePath = node.docsPath.substring(0, node.docsPath.indexOf(oldName));
            let afterPath = node.docsPath.substring(node.docsPath.indexOf(oldName) + oldName.length);
            node.docsPath = beforePath + newName + afterPath;
            //update in opened files
            for (let i = 0; i < openedFiles.length; i++) {
              if (openedFiles[i].key == key) {
                openedFiles[i].name = newName;
                openedFiles[i].docsPath = beforePath + newName + afterPath;
              }
            }
            //update  in activeFile
            if (activeFile.key == key) {
              activeFile.name = newName;
              activeFile.docsPath = beforePath + newName + afterPath;
            }


            dispatch({
              type: RENAME_ITEM,
              openedFiles,
              contentTree,
              activeFile
            });

            FilesService.ContentFileToConfig(getStore().projectWindow.tree.path, node, "UPDATE", function(err, data) {
              console.log(err)
              console.log(data)
            })

          } else {
            console.log(err)
          }
        });
      }
    } else {
      alert("Pleas enter name");
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
