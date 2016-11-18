const fs = require('fs');
const path = require('path');
import { guid } from '../services/guid';

export var FilesService = {
  openProjectTree: openProjectTree,
  createFile: createFile,
  deleteFile: deleteFile,
  openFile: openFile,
  saveFile: saveFile,
  addContentFileToConfig: addContentFileToConfig,
  addContentTreeToConfig: addContentTreeToConfig,
  getFileTree: getFileTree,
  renameFile: renameFile,
  createToPathDir
}

function openProjectTree(projectPath, callback, errorCallback) {
  fs.readFile(path.join(projectPath, '.codedoc', 'docsConfig.json'), 'utf8', (err, data) => {
    if (err) {
      console.log('no project here')
      errorCallback && errorCallback(err.message);
    //throw err
    }
    ;
    let config = JSON.parse(data);
    let ignore = config.ignore;
    let contentTree = config.contentTree;
    let tree = getFileTree(projectPath, ignore, contentTree);
    //tree.expand = true;
    callback && callback(tree, contentTree);
  });
}

function createFile(filePath, callback) {
  fs.writeFile(filePath, "", function(err) {
    if (err) console.error(err);
    else {
      callback && callback();
    }
  });
}

function createToPathDir(dir, baseName, callback) {
  //debugger;
  let pathToBase = dir.substring(0, dir.indexOf(baseName) + baseName.length + 1);
  let pathFromBase = dir.substring(dir.indexOf(baseName) + baseName.length + 1, dir.length);
  let folders = pathFromBase.split("/");
  for (let i = 0; i < folders.length; i++) {
    pathToBase += ((i == 0 ? "" : "/") + folders[i]);
    try {
      let stat = fs.statSync(pathToBase);
    } catch (error) {
      fs.mkdirSync(pathToBase);
    }
  }
}

function deleteFile(filePath, callback) {
  fs.unlink(filePath, callback);
}

function openFile(filePath, fileCallback, folderCallback) {
  fs.stat(filePath, function(err, stat) {
    if (!err) {
      let isDir = stat.isDirectory();
      if (isDir) {
        folderCallback();
      } else {
        fs.readFile(filePath, 'utf-8', function(e, data) {
          if (e) {
            console.error(e);
          } else {
            fileCallback(data);
          }
        });
      }
    } else {
      console.log(err);
    }

  });

}

function saveFile(filePath, content, callback, errorCallback) {
  fs.writeFile(filePath, content, function(err) {
    if (err) {
      errorCallback && errorCallback(err.message);
    } else {
      callback && callback(filePath, path.basename(filePath));
    }
  });
}

function renameFile(oldPath, newName, callback) {
  let newPath = oldPath.substring(0, oldPath.lastIndexOf("/")) + "/" + newName;
  fs.stat(newPath, function(err) {
    if (err) {
      fs.rename(oldPath, newPath, function(err) {
        if (err) callback(err);
        else {
          callback();
        }
      })
    } else {
      callback(err);
    }
  });
}

function addContentFileToConfig(projectPath, file, callback) {
  let configPath = path.join(projectPath, '.codedoc', 'docsConfig.json');
  fs.readFile(configPath, 'utf-8', function(err, data) {
    if (err) {
      console.error(err);
    //errorCallback && errorCallback(err.message);
    } else {
      let config = JSON.parse(data);
      let newFile = {
        docsPath: file.docsPath,
        name: file.name + ".md",
        path: file.path,
        key: file.key
      };
      config.contentTree.push(newFile);
      fs.writeFile(configPath, JSON.stringify(config), (err) => {
        if (err) {
          console.error(err);
        //errorCallback && errorCallback(err.message);
        } else {
          callback && callback(newFile);
        }

      })
    }
  });
}


function addContentTreeToConfig(projectPath, contentTree, callback) {
  let configPath = path.join(projectPath, '.codedoc', 'docsConfig.json');
  fs.readFile(configPath, 'utf-8', function(err, data) {
    if (err) {
      console.error(err);
    //errorCallback && errorCallback(err.message);
    } else {
      let config = JSON.parse(data);
      //let newFile= {docsPath: file.docsPath, name: file.name, path: file.path, key: file.key};
      config.contentTree = contentTree;
      fs.writeFile(configPath, JSON.stringify(config), (err) => {
        if (err) {
          console.error(err);
        //errorCallback && errorCallback(err.message);
        } else {
          callback && callback(contentTree);
        }

      })
    }
  });
}

function getFileTree(folderPath, ignore = [], contentTree, isNew = false, base = folderPath, key = 'base') {
  let stats = fs.lstatSync(folderPath),
    tree = {
      path: folderPath,
      hasDocs: false,
      name: path.basename(folderPath),
      key: key
    };
  let docsPath = path.join(base, '.codedoc', folderPath.substring(base.length, folderPath.length - (stats.isDirectory() ? 0 : path.basename(folderPath).length)), (path.basename(folderPath) + '.md'));
  try {
    fs.accessSync(docsPath, fs.F_OK);
    tree.hasDocs = true;
    tree.docsPath = docsPath;
    if (!isNew)
      tree.key = findKey(docsPath, contentTree);
  } catch (e) {
    tree.hasDocs = false;
    tree.docsPath = docsPath;
    if (tree.name.substr(-3) === '.md') {
      tree.docsPath = tree.path;
      delete tree.path;
    }
  }
  if (stats.isDirectory()) {
    let filteredChildren = fs.readdirSync(folderPath).filter(function(child) {
      return !_.find(ignore, function(item) {
        return item === child;
      });
    });
    tree.children = filteredChildren.map(function(child) {
      let newKey = guid();
      if (child.substr(-3) === '.md') {
        if (isNew) {
          contentTree.push({
            docsPath: path.join(folderPath, child),
            name: child,
            key: newKey
          });
        } else {
          newKey = findKey(path.join(folderPath, child), contentTree);
        }
      }
      return getFileTree(path.join(folderPath, child), ignore, contentTree, isNew, base, newKey);
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

function findKey(currentFilePath, contentTree) {
  const loop = (data, filePath, callback) => {
    //debugger;
    data.forEach((item, index, arr) => {
      if (item.docsPath === filePath) {
        return callback(item, index, arr);
      }
      if (item.children) {
        return loop(item.children, filePath, callback);
      }
    });
  };
  let contentFile;
  loop(contentTree, currentFilePath, (item) => {
    contentFile = item;
  });

  return contentFile.key;
}
