var fs = require('fs');
var blocksPath = './blocks/';

function processTree(bem_tree) {
    for (bem_entry in bem_tree) {
        if(bem_tree[bem_entry].type == 'block'){
            checkBlock(bem_tree[bem_entry]);
            if(!!bem_tree[bem_entry].content) {
                processTree(bem_tree[bem_entry].content);
            }
        }
    }
}

function checkBlock(block) {
    var blockDir = blocksPath + block.name + '/';
    var blockFiles= {
        cssFileName: blockDir + block.name + '.css',
        jsFileName: blockDir + block.name + '.js',
        templateFileName: blockDir + block.name + '.jade'
    }
    if(!fs.existsSync(blockDir)) {
        fs.mkdirSync(blockDir);
    }
    for(file in blockFiles) {
        if(!fs.existsSync(blockFiles[file])) {
            fs.writeFile(blockFiles[file]);
        }
    }
};

function writeTo(path, name, content) {
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    var filename = path + name
    fs.writeFile(filename, content, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(filename + ' written successfully')
        }
    })
}

exports.processTree = processTree;
exports.writeTo = writeTo;