let contentTreeList = new Array({
  title: "New",
  target: 'con-tree-item',
  action: "OPEN_FILE"
});

let treeList = new Array({
  title: "New",
  target: 'file-in-tree',
  action: "OPEN_FILE"
}, {
  title: "Delete",
  target: 'file-in-tree',
  action: "DELETE_FILE"
}, {
  title: "Copy",
  target: 'file-in-tree',
  action: "COPY_FILE"
}, {
  title: "Add MD file",
  target: 'tree-folder',
  action: "CREATE_MD_FILE_IN_FOLDER"
}, {
  title: "Add Comments file",
  target: 'tree-folder',
  action: "CREATE_COMMENT_FILE_IN_FOLDER"
}, {
  title: "Rename",
  target: 'tree-folder',
  action: "RENAME_ITEM"
}, {
  title: "Delete MD file",
  target: 'tree-folder',
  action: "DELETE_MD_FILE_IN_FOLDER"
}, {
  title: "Delete Comments file",
  target: 'tree-folder',
  action: "DELETE_COMMENT_FILE_IN_FOLDER"
}, {
  title: "Item",
  target: 'tree-item',
  action: "COPY_FILE"
});

let generalList = new Array({
  title: "File",
  target: 'general',
  action: "OPEN_FILE"
}, {
  title: "Save",
  target: 'general',
  action: "SAVE_FILE"
}, {
  title: "Add",
  target: 'general',
  action: "ADD_FILE"
});
export default new Array(...contentTreeList, ...treeList, ...generalList);
