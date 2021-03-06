export const menuConfig = 
[{
	label: '&File',
		submenu: [{
			label: '&New markdown file',
			accelerator: 'CmdOrCtrl+M',
			id: 'NewMarkdown'
		},{
			label: '&New Project documentation',
			accelerator: 'CmdOrCtrl+D',
			id: 'NewProjectDocs'
		},{
			label: '&New Project commentaries',
			accelerator: 'CmdOrCtrl+N',
			id: 'NewProjectComments'
		},{
			label: '&Open',
			submenu:[{
				label: '&Markdown file',
				accelerator: 'CmdOrCtrl+O',
				id: 'OpenMarkdown'
			},{
				label: '&Project documentation',
				accelerator: 'CmdOrCtrl+T',
				id: 'OpenProjectDocs'
			},{
				label: '&Project commentaries',
				accelerator: 'CmdOrCtrl+P',
				id: 'OpenProjectComments'
			}]
		},{
			label: '&Save',
			accelerator: 'CmdOrCtrl+S', 
			id: 'SaveFile'
		},{
			label: '&Save as',
			accelerator: 'CmdOrCtrl+Shift+S', 
			id: 'SaveFileAs'
		},{
			label: '&Save All',
			//accelerator: 'CmdOrCtrl+Shift+S', 
			id: 'SaveAllFiles'
		},{
			label: '&Close',
			//accelerator: 'CmdOrCtrl+H',
			id: 'FileClose'
		},{
			label: '&Quit',
			accelerator: 'CmdOrCtrl+Q',
			id: 'Quit'
		}]
}, {
	label: '&Export',
	submenu: [{
			label: '&Current to HTML',
			id: 'CurrentToHTML'
	}]
		// },{
		// 	label: '&Project to HTML',
		// 	id: 'ProjectToHTML'
		// }]
}];