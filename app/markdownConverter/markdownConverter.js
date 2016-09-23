export const LOAD_CODE_FILE = 'LOAD_CODE_FILE';


const remote = require('remote');
const electron =  remote.require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;
const showdown  = require('showdown');

// import githubMarkdown from './assets/css/githubMarkdown.css';
// import hljsGithub from './assets/css/hljs-github.min.css';
// import pilcrow from './assets/css/pilcrow.css';
// import page from './assets/css/page.html';

// const githubMarkdown = require('./markdownConverterTemplates/assets/css/github-markdown.css');
// const hljsGithub = require('./markdownConverterTemplates/assets/css/hljs-github.min.css');
// const pilcrow = require('./markdownConverterTemplates/assets/css/pilcrow.css');
//const page = require('./markdownConverterTemplates/page.css');



// const extension = require('showdown-twitter');//('../src/showdown-twitter.js')
// const mds = require('markdown-styles');

// export function changeText(text, cursorPosition) {
// 	return {
// 		type: CHANGE_TEXT,
// 		text: text,
// 		cursorPosition: cursorPosition
// 	};
// }

export function convertMDtoHTML() {
	return (dispatch, getStore) => {
		console.log('converting');
		let store = getStore();
		let md_content = store.mainWindow.mainWindowText;
		let converter = new showdown.Converter();		
		let html_content = converter.makeHtml(md_content);

		dialog.showSaveDialog({ 
			title: 'Save File',
			filters: [{ 
				name: 'Web-page', 
				extensions: ['html'] 
			}]
		}, function (filePath) {
			if(filePath) {
				if (filePath.substr(-5,5) !== '.html'){
					filePath += '.html';
				}
				fs.readFile('./app/markdownConverter/markdownConverterTemplates/singlePage.html', 'utf8', (err, data) => {
					if (err) {
						console.log(err);
					};
					let html_file = data.replace('{{content}}', html_content);
					html_file = html_file.replace('{{title}}', path.basename(store.mainWindow.currentLink, '.md'));
					fs.writeFile(filePath, html_file, function (err) {
						if(err) {
							console.log(err);
						} else {
							console.log('saved');
						}				
					});
				});
			} else {
				return;
			}
		});
	};
}