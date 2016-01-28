export const menuConfig = [{
	label: '&File',
	submenu: [{
		label: '&New markdown',
		accelerator: 'CmdOrCtrl+M',
		id: 'NewMarkdown'
	},{
		label: '&New Project',
		accelerator: 'CmdOrCtrl+N',
		id: 'NewProject'
	},{
		label: '&Open',
		submenu:[{
			label: '&Markdown',
			accelerator: 'CmdOrCtrl+O',
			id: 'OpenMarkdown'
		},{
			label: '&Project',
			accelerator: 'CmdOrCtrl+P',
			id: 'OpenProject'
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