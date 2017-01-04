export const LOAD_CODE_FILE = 'LOAD_CODE_FILE';

const CONFIG_PATH = '/.codedoc/docsConfig.json';
const ROOT_PATH = '/_codedoc_html';

const remote = require('remote');
const electron = remote.require('electron');
const {shell} = require('electron');
const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const hljs   = require('highlight.js');

const dialog = electron.dialog;
const converter = new showdown.Converter();

export function exportAllToHTML(basePath) {
	showdown.setOption('tables', true);
	readConfig(basePath, function(content){
		var pages = generatePages(content);
		if (pages.length) {
			dialog.showOpenDialog({
				title: 'Select directory for HTML files',
				properties: ['openDirectory'],
				defaultPath: '/'
			}, function(dir) {
				if (dir) {
					const currPath = dir + ROOT_PATH;
					createFolder(currPath);

					const container = fs.readFileSync('./app/markdownConverter/layout/single-three-cols.html', 'utf8');
					const block = fs.readFileSync('./app/markdownConverter/layout/block.html', 'utf8');
					const main = fs.readFileSync('./app/markdownConverter/layout/map.html', 'utf8');

					let contentHtml = '';
					let outputHtml = '';
					let links = '';

					pages.forEach(function(page) {
						links += `<li><a href='${page.id + ".html"}'>${page.title}</a></li>`;
					});

					pages.forEach(function(page) {
						contentHtml = replaceAll(block, {
							'{{title}}': page.title,
							'{{code}}': page.code,
							'{{md}}': page.md,
							'{{id}}': page.id
						});

						outputHtml = replaceAll(container, {
							'{{content}}': contentHtml,
							'{{links}}': links,
							'{{title}}': page.title
						});

						fs.writeFileSync(currPath + '/' + page.id + '.html', outputHtml);
					});

					const indexPage = main.replace('{{links}}', links);
					fs.writeFileSync(currPath+ '/index.html', indexPage);
					shell.openExternal('file://' + currPath + '/index.html');
					alert('Files successfuly exported');
				}
			});
		}
	});
};

export function exportToSingleHtml(basePath) {
	showdown.setOption('tables', true);
	readConfig(basePath, function(content){
		var pages = generatePages(content);
		if (pages.length) {
			dialog.showOpenDialog({
				title: 'Select directory for HTML files',
				properties: ['openDirectory'],
				defaultPath: '/'
			}, function(dir) {
				if (dir) {
					const currPath = dir + ROOT_PATH;
					createFolder(currPath);
					const container = fs.readFileSync('./app/markdownConverter/layout/single-three-cols.html', 'utf8');
					const block = fs.readFileSync('./app/markdownConverter/layout/block.html', 'utf8');
					let contentHtml = '';
					let links = '';

					pages.forEach(function(page) {
						contentHtml += replaceAll(block, {
							'{{title}}': page.title,
							'{{code}}': page.code,
							'{{md}}': page.md,
							'{{id}}': page.id
						});
						links += `<li><a href='${"#" + page.id}'>${page.title}</a></li>`;
					});

					const indexPage =  replaceAll(container, {
						'{{content}}': contentHtml,
						'{{links}}': links
					});

					fs.writeFileSync(currPath + '/index.html', indexPage);
					shell.openExternal('file://' + currPath + '/index.html');
					alert('Files successfuly exported');
				}
			});
		}
	});
};


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
		}, function(filePath) {
			if (filePath) {
				if (filePath.substr(-5, 5) !== '.html') {
					filePath += '.html';
				}
				fs.readFile('./app/markdownConverter/markdownConverterTemplates/singlePage.html', 'utf8', (err, data) => {
					if (err) {
						console.log(err);
					}
					;
					let html_file = data.replace('{{content}}', html_content);
					html_file = html_file.replace('{{title}}', path.basename(store.mainWindow.currentLink, '.md'));
					fs.writeFile(filePath, html_file, function(err) {
						if (err) {
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
};

let deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + '/' + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

let readConfig = function(basePath, callback) {
	fs.readFile(basePath + CONFIG_PATH, 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			let docs = JSON.parse(data).contentTree;
			if (!docs.length) {
				alert('Nothing to export');
			} else {
				let content = [];
				for (let i = 0; i < docs.length; i++) {
					try {
						content[i] = {
							title: docs[i].path.substring(docs[i].path.indexOf(basePath) + basePath.length),
							code: fs.readFileSync(docs[i].path, 'utf-8'),
							md: fs.readFileSync(docs[i].docsPath, 'utf-8')
						};
					} catch (e) {
						alert(e);
						break;
					}
				}
				if (callback && _.isFunction(callback)) callback(content);
			}
		}
	});
};

let generatePages = function(content) {
	let pages = [];
	content.forEach(function(item){
		if (item.code && item.md) {
			pages.push({
				title: item.title,
				code: hljs.highlightAuto(item.code).value,
				md: converter.makeHtml(item.md),
				id: item.title.replace(/\//g, '_')
			});
		}
	});

	return pages;
};

let createFolder = function(path) {
	try {
		fs.mkdirSync(path);
	} catch (e) {
		deleteFolderRecursive(path);
		console.log(e);
		fs.mkdirSync(path);
	}
};

let replaceAll = function(str, mapObj){
    var re = new RegExp(Object.keys(mapObj).join('|'),'gi');
    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
};