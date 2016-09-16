const fs = require('fs');
const path = require('path');

export var FilesService = {
    openProjectTree: openProjectTree,
    createFile: createFile,
    openFile: openFile,
    saveFile: saveFile,
    addContentFileToConfig: addContentFileToConfig
}

    function openProjectTree(projectPath, callback, errorCallback){
        fs.readFile(path.join(projectPath, '.codedoc','docsConfig.json'), 'utf8', (err, data) => {
            if (err) {
                console.log('no project here')
                errorCallback && errorCallback(err.message);
                //throw err
            };
            let config = JSON.parse(data);
            let ignore = config.ignore;
            let contentTree = config.contentTree;
            let tree = getFileTree(projectPath, ignore);
            tree.collapsed = true;
            callback && callback(tree, contentTree);
        });
    }

    function createFile(filePath, callback){
        fs.writeFile(filePath, "", function (err) {
            if(err) console.error(err);
            else {
                debugger;
                console.log(filePath);
                callback && callback();
            }
        });
    }
    
    function openFile(filePath, callback, errorCallback){
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if(err) {
                console.error(err);
                errorCallback && errorCallback(err.message);
            } else {
                callback && callback(data);
            }
		});
    }

    function saveFile(filePath, content, callback, errorCallback){
        fs.writeFile(filePath, content, function (err) {
            if(err) {
                errorCallback && errorCallback(err.message);
            } else {
                callback && callback(filePath);
            }
        });
    }

    function addContentFileToConfig(projectPath, file, callback){
        let configPath = path.join(projectPath, '.codedoc', 'docsConfig.json');
        fs.readFile(configPath, 'utf-8', function (err, data) {
            if(err) {
                console.error(err);
                //errorCallback && errorCallback(err.message);
            } else {
                //console.log('data--',data);
                let config = JSON.parse(data);
                let newFile= {path: file.docsPath, name: file.name, parentPath: file.path};
                config.contentTree.push(newFile);
                fs.writeFile(configPath, JSON.stringify(config), (err) => {
                    if(err) {
                        console.error(err);
                        //errorCallback && errorCallback(err.message);
                    } else {
                        callback && callback(newFile);
                    }
                    
                } )
            }
		});

        //console.log('file--',file);
        //console.log('config--',config);
    }

    function getFileTree(folderPath, ignore = [], base = folderPath) {
        let stats = fs.lstatSync(folderPath),
                tree = {
                    path: folderPath,
                    hasDocs: false,
                    name: path.basename(folderPath)
                };
        let docsPath = path.join(base, '.codedoc', folderPath.substring(base.length, folderPath.length - (stats.isDirectory() ? 0 : path.basename(folderPath).length)), (path.basename(folderPath) + '.md'));
        try {
            fs.accessSync(docsPath, fs.F_OK);
            tree.hasDocs = true;
            tree.docsPath = docsPath;
        } catch (e) {
            tree.hasDocs = false;
            tree.docsPath = docsPath;
        }
        if (stats.isDirectory()) {
            let filteredChildren = fs.readdirSync(folderPath).filter(function(child) {
                return !_.find(ignore, function(item) {
                    return item === child;
                });
            });
            tree.children = filteredChildren.map(function(child) {
                return getFileTree(path.join(folderPath, child), ignore, base);
            });
            tree.children.sort(function(a, b) {
                let A = a.children ? 1 : 0;
                let B = b.children ? 1 : 0;
                if ((B - A) === 0) {
                    return (b.name > a.name) ? -1 : 1;
                }
                return B - A;
            });
        }
        return tree;
    }

