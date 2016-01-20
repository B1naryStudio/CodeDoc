export const menuConfig = [{
	label: '&File',
	submenu: [{
		label: '&New file',
		accelerator: 'CmdOrCtrl+N',
		id: 'CreateNew'
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
		id: 'SaveFile'
	},{
		label: '&Quit',
		accelerator: 'CmdOrCtrl+Q',
		id: 'Quit'
	}]
}];