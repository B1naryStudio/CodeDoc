export default new Array({
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
}, {
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
  title: "Add file",
  target: 'tree-folder',
  action: "CREATE_MD_FILE_IN_FOLDER"
}, {
  title: "Item",
  target: 'tree-item',
  action: "COPY_FILE"
});
