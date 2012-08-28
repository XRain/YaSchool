var fs = require('fs');
var blocksPath = './blocks/';

//Запуск обхоа дерева
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

//меотод, проверяющий наличие всех необходимых блоку файлов, и создающий отсутствующие
function checkBlock(block) {
    var blockDir = blocksPath + block.name + '/';
    var blockFiles= [
        {path: blockDir + block.name + '.css', content: '.' + block.class + ' {position: relative}'},
        {path: blockDir + block.name + '.js', content: 'console.log("script ' + block.name + '.js' + 'loaded successfully");'},
        {path: blockDir + block.name + '.jade', content: 'div(class="#{locals.class}")' + '\r\n  !{locals.content}'}
    ]
    if(!fs.existsSync(blockDir)) {
        fs.mkdirSync(blockDir);
    }
    for(file in blockFiles) {
        if(!fs.existsSync(blockFiles[file].path)) {
            fs.writeFileSync(blockFiles[file].path, blockFiles[file].content);
        }
    }
};

//публичный метод для записи файла в указанную папку
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