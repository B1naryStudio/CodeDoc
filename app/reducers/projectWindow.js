import { TREE_LOAD, FILE_OPENED, CLOSE_ALL_FILES, DRAG_AND_DROP, CLEAR_CURRENT_PROJECT, DRAG_AND_DROP_BEGIN, UPDATE_PROJECT, CONTENT_TREE_LOAD } from '../actions/projectWindow';
import { UPDATE_BY_CONTENT_ITEM } from "../actions/contextMenu.actions"
import { treeSearch } from "../services/treeSearch"
let initialState = {
  tree: {},
  contentTree: {},
  openedFiles: [],
  activeFile: {}
}

export default function projectWindow(state = initialState, action) {
  switch (action.type) {

    // case ADD_FILE_TO_FOLDER: {

    //   let node = treeSearch(state.tree, action.parentKey);
    //   if (action.hasDocs)
    //     node.hasDocs = action.hasDocs;
    //   if (action.hasCom)
    //     node.hasCom = action.hasCom;
    //   node.children = [...node.children, {
    //     key: action.key,
    //     hasDocs: false,
    //     path: action.path,
    //     name: action.name
    //   }];
    //   let tree = Object.assign({}, state.tree);
    //   return Object.assign({}, state, {
    //     tree
    //   });
    // }
    // case DELETE_FILE_FROM_FOLDER: {
    //   let node = treeSearch(state.tree, action.key);
    //   if (!action.hasDocs)
    //     node.hasDocs = action.hasDocs;
    //   if (!action.hasCom)
    //     node.hasCom = action.hasCom;
    //   let index = -1;
    //   for (let i = 0; i < node.children.length; i++) {
    //     if (node.children[i].name == action.file) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   node.children.splice(index, 1);
    //   node.children = [...node.children];
    //   let tree = Object.assign({}, state.tree);
    //   return Object.assign({}, state, {
    //     tree
    //   });
    // }

    case UPDATE_BY_CONTENT_ITEM: {
      return Object.assign({}, state, {
        tree: action.tree,
        contentTree: {
          tree: [...action.contentTree]
        },
        openedFiles: [...action.openedFiles],
        activeFile: Object.assign({}, action.activeFile)
      });
    }
    case TREE_LOAD:
      //let tree = readFile(action.payload.path)
      return Object.assign({}, state, {
        tree: action.payload.tree
      })
    case CONTENT_TREE_LOAD:
      return Object.assign({}, state, {
        contentTree: {
          tree: action.payload.contentTree
        }
      })
    case FILE_OPENED: {
      // let fileList = state.openedFiles;
      // fileList.push(action.payload.openFile);

      return Object.assign({}, state, {
        openedFiles: action.payload.openedFiles,
        activeFile: action.payload.activeFile
      })
    }
    case DRAG_AND_DROP: {
      return Object.assign({}, state, {
        openedFiles: action.payload.openedFiles,
        /*activeFile: action.payload.activeFile,*/
        dragAndDrop: action.payload.dragAndDrop
      })
    }
    case DRAG_AND_DROP_BEGIN: {
      return Object.assign({}, state, {
        dragAndDrop: false
      })
    }
    case CLOSE_ALL_FILES: {
      return Object.assign({}, state, {
        openedFiles: [],
        activeFile: {}
      })
    }
    case CLEAR_CURRENT_PROJECT: {
      return Object.assign({}, state, {
        tree: {},
        openedFiles: [],
        activeFile: {}
      })
    }
    case UPDATE_PROJECT: {
      return Object.assign({}, state, {
        openedFiles: action.payload.openedFiles
      });
    }
    default:
      return state
  }
}
