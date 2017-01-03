export const LOAD_CODE_FILE = 'LOAD_CODE_FILE';


const remote = require('remote');
const electron = remote.require('electron');
const {shell} = require('electron');
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;
const showdown = require('showdown');
const hljs   = require('highlight.js');

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
export function exportAllToHTML(basePath) {
	console.log(showdown.getDefaultOptions());
	showdown.setOption("tables", true);
	//showdown.setOption('optionKey', 'value');
	let converter = new showdown.Converter();
	let rootFolder = "/_codedoc_html";
	fs.readFile(basePath + "/.codedoc/docsConfig.json", "utf-8", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			let config = JSON.parse(data);
			if (!config.contentTree.length) {
				alert("Nothing to export");
			} else {
				//get docs path and content
				let docs = config.contentTree;
				let mdContents = [];
				for (let i = 0; i < docs.length; i++) {
					try {
						mdContents[i] = fs.readFileSync(docs[i].docsPath, "utf-8");
					} catch (e) {
						alert(e);
						break;
					}
				}
				let pages = [];
				let title;
				//generate pages
				for (let i = 0; i < docs.length; i++) {
					if (mdContents[i]) {
						title = docs[i].docsPath.substring(docs[i].docsPath.indexOf(basePath) + basePath.length + 10);
						pages.push({
							title: title.replace(/\//g, "_"),
							content: converter.makeHtml(mdContents[i])
						});
					}
				}
				//if some pages
				if (pages.length) {
					dialog.showOpenDialog({
						title: "Select directory for HTML files",
						properties: ["openDirectory"],
						defaultPath: "/"
					}, function(dir) {
						if (dir) {

							try {
								fs.mkdirSync(dir + rootFolder);
							} catch (e) {
								deleteFolderRecursive(dir + rootFolder);
								console.log(e);
								fs.mkdirSync(dir + rootFolder);
							}
							let singlePage = fs.readFileSync('./app/markdownConverter/markdownConverterTemplates/singlePage.html', 'utf8');
							let home = fs.readFileSync('./app/markdownConverter/markdownConverterTemplates/map.html', 'utf8');
							let links = "";
							for (let i = 0; i < pages.length; i++) {
								links += `<li><a href='${pages[i].title+".html"}'>${pages[i].title}</a></li>`;
								pages[i].content = singlePage.replace("{{content}}", "<a id='back-to-main' href='index.html'>Back to Main</a>" + pages[i].content);
								pages[i].content = pages[i].content.replace("{{title}}", pages[i].title);
								fs.writeFileSync(dir + rootFolder + "/" + pages[i].title + ".html", pages[i].content);
							}
							let main = home.replace("{{_links}}", links);
							fs.writeFileSync(dir + rootFolder + "/index.html", main);
							shell.openExternal("file://" + dir + rootFolder + "/index.html");
							alert("Files successfuly exported");
						}
					});
				}
			}
		}
	});
}


export function exportAllToHTML2(basePath) {
	showdown.setOption("tables", true);
	let converter = new showdown.Converter();
	let rootFolder = "/_codedoc_html";
	fs.readFile(basePath + "/.codedoc/docsConfig.json", "utf-8", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			let config = JSON.parse(data);
			if (!config.contentTree.length) {
				alert("Nothing to export");
			} else {
				let docs = config.contentTree;
				let mdContents = [];
				let codeContents = [];
				for (let i = 0; i < docs.length; i++) {
					try {
						mdContents[i] = fs.readFileSync(docs[i].docsPath, "utf-8");
						codeContents[i] = fs.readFileSync(docs[i].path, "utf-8");
					} catch (e) {
						alert(e);
						break;
					}
				}
				let pages = [];
				let title;
				//generate pages
				for (let i = 0; i < docs.length; i++) {
					let page = {};
					if (codeContents[i]) {
						page.code = hljs.highlightAuto(codeContents[i]).value;
						title = docs[i].path.substring(docs[i].path.indexOf(basePath) + basePath.length);
						page.id = title.replace(/\//g, "_");
						page.title = title;
					}
					if (mdContents[i]) {
						page.content =  converter.makeHtml(mdContents[i]);
					}
					pages.push(page);
				}

				//if some pages
				if (pages.length) {
					dialog.showOpenDialog({
						title: "Select directory for HTML files",
						properties: ["openDirectory"],
						defaultPath: "/"
					}, function(dir) {
						if (dir) {

							try {
								fs.mkdirSync(dir + rootFolder);
							} catch (e) {
								deleteFolderRecursive(dir + rootFolder);
								console.log(e);
								fs.mkdirSync(dir + rootFolder);
							}
							let page = fs.readFileSync('./app/markdownConverter/layout/single-three-cols.html', 'utf8');
							let home = fs.readFileSync('./app/markdownConverter/layout/map.html', 'utf8');
							let container = fs.readFileSync('./app/markdownConverter/layout/block.html', 'utf8');
							let links = "";
							var html;
							var contentHtml = "";
							let block;

							for (let i = 0; i < pages.length; i++) {
								links += `<li><a href='${pages[i].id+".html"}'>${pages[i].title}</a></li>`;
							}
							for (let i = 0; i < pages.length; i++) {
								block = container.replace('{{title}}', pages[i].title);
								block = block.replace('{{id}}', pages[i].id);
								block = block.replace('{{code}}', pages[i].code);
								block = block.replace('{{content}}', pages[i].content);
								html = page.replace("{{content}}", block);
								html = html.replace("{{title}}", pages[i].title);
								html = html.replace("{{links}}", links);
								fs.writeFileSync(dir + rootFolder + "/" + pages[i].id + ".html", html);
							}

							let main = home.replace("{{_links}}", links);
							fs.writeFileSync(dir + rootFolder + "/index.html", main);
							shell.openExternal("file://" + dir + rootFolder + "/index.html");
							alert("Files successfuly exported");
						}
					});
				}
			}
		}
	});
}

export function exportToSingleHtml(basePath) {
	showdown.setOption("tables", true);
	let converter = new showdown.Converter();
	let rootFolder = "/_codedoc_html";
	fs.readFile(basePath + "/.codedoc/docsConfig.json", "utf-8", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			let config = JSON.parse(data);
			if (!config.contentTree.length) {
				alert("Nothing to export");
			} else {
				let docs = config.contentTree;
				let mdContents = [];
				let codeContents = [];
				for (let i = 0; i < docs.length; i++) {
					try {
						mdContents[i] = fs.readFileSync(docs[i].docsPath, "utf-8");
						codeContents[i] = fs.readFileSync(docs[i].path, "utf-8");
					} catch (e) {
						alert(e);
						break;
					}
				}
				let pages = [];
				let title;
				//generate pages
				for (let i = 0; i < docs.length; i++) {
					let page = {};
					if (codeContents[i]) {
						page.code = hljs.highlightAuto(codeContents[i]).value;
						title = docs[i].path.substring(docs[i].path.indexOf(basePath) + basePath.length);
						page.id = title.replace(/\//g, "_");
						page.title = title;
					}
					if (mdContents[i]) {
						page.content =  converter.makeHtml(mdContents[i]);
					}
					pages.push(page);
				}

				//if some pages
				if (pages.length) {
					dialog.showOpenDialog({
						title: "Select directory for HTML files",
						properties: ["openDirectory"],
						defaultPath: "/"
					}, function(dir) {
						if (dir) {

							try {
								fs.mkdirSync(dir + rootFolder);
							} catch (e) {
								deleteFolderRecursive(dir + rootFolder);
								console.log(e);
								fs.mkdirSync(dir + rootFolder);
							}
							let page = fs.readFileSync('./app/markdownConverter/layout/single-three-cols.html', 'utf8');
							let home = fs.readFileSync('./app/markdownConverter/layout/map.html', 'utf8');
							let container = fs.readFileSync('./app/markdownConverter/layout/block.html', 'utf8');
							let links = "";
							var html;
							var contentHtml = "";
							let block;

							for (let i = 0; i < pages.length; i++) {
								block = container.replace('{{title}}', pages[i].title);
								block = block.replace('{{id}}', pages[i].id);
								block = block.replace('{{code}}', pages[i].code);
								block = block.replace('{{content}}', pages[i].content);
								contentHtml += block;
								links += `<li><a href='${"#"+pages[i].id}'>${pages[i].title}</a></li>`;
							}

							html = page.replace("{{content}}", contentHtml);
							html = html.replace("{{links}}", links);
							fs.writeFileSync(dir + rootFolder + "/index.html", html);
							shell.openExternal("file://" + dir + rootFolder + "/index.html");
							alert("Files successfuly exported");
						}
					});
				}
			}
		}
	});
}


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
}

var deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};