const fs = require('fs');
const path = require('path');

export var FilesService = {
    openProjectTree: openProjectTree,
    createFile: createFile,
    openFile: openFile
}

    function openProjectTree(projectPath, callback){
        fs.readFile(path.join(projectPath, '.codedoc','docsConfig.json'), 'utf8', (err, data) => {
            if (err) {
                console.log('no project here')
                throw err
            };
            let ignore = JSON.parse(data).ignore;
            let tree = getFileTree(projectPath, ignore);
            tree.collapsed = true;
            callback(tree);
        });
    }

    function createFile(filePath, callback){
        fs.writeFile(filePath, "", function (err) {
            if(err) console.error(err);
            else {
                callback();
            }
        });
    }
    
    function openFile(filePath, callback){
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if(err) console.error(err)
            else{
                console.log('file open');
                callback(data);
            }
		});
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

