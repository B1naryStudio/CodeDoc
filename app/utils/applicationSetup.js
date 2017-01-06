const remote = require('remote');
const Menu = remote.require('menu');
import { menuConfig } from '../menu/menu';
import { ActionsHandler } from '../menu/actions';
const {shell} = require('electron');

export class appSetup {
	
	constructor(){

		this.menuConfig = menuConfig;
		this.ActionsHandler = new ActionsHandler();
		this.menu = this.templateMaker(menuConfig);
		this.menuTemplate = Menu.buildFromTemplate(this.menu);
		
		Menu.setApplicationMenu(this.menuTemplate);
		this.bindListeners();
	}

	templateMaker(JSONArr){
		let element;
		let self = this;
		element = JSONArr.map(function(item){
			let tempObj = {};
			for(let i in item){
				if (i === 'submenu'){
					tempObj[i] = self.templateMaker(item[i]);
				} else if (i === 'id'){
					tempObj['click'] = self.ActionsHandler['on' + item[i]];
				} else {
					tempObj[i] = item[i];
				}
			}
			return tempObj;
		});
		return element;
	}

	bindListeners(){

		document.addEventListener('click', (event) => { 
			if (event.target && event.target.tagName.toLowerCase() === 'a'){
				event.preventDefault();
				shell.openExternal(event.target.href);		
			}
		});

	}

}
