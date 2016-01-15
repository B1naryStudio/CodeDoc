export const menuConfig = [{
	label: '&File',
	submenu: [{
		label: '&New file',
		accelerator: 'CmdOrCtrl+N',
		id: 'New'
	},{
		label: '&Open',
		submenu:[{
			label: '&File',
			accelerator: 'CmdOrCtrl+O',
			id: 'OpenNew'
		},{
			label: '&For documenting',
			accelerator: 'CmdOrCtrl+D',
			id: 'OpenDocumenting'
		},{
			label: '&For commenting',
			accelerator: 'CmdOrCtrl+M',
			id: 'OpenCommenting'
		}]
	},{
		label: '&Save',
		accelerator: 'CmdOrCtrl+S', 
		id: 'Save'
	},{
		label: '&Quit',
		accelerator: 'CmdOrCtrl+Q',
		id: 'Quit'
	}]
}];