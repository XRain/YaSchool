var fs = require('fs');
var jade = require('jade');
var bem_tree = require('./bem_tree').getStructure();
var blocksPath = './blocks/';
var userScripts = [];
var userCss = [];

function checkBlock(block) {
    var blockRealName = block.name.split('-')[1];
    var blockDir = blocksPath + blockRealName + '/';
    var cssFileName = blockDir + blockRealName + '.css';
    var jsFileName = blockDir + blockRealName + '.js';
    if(!fs.existsSync(blockDir)) {
        fs.mkdirSync(blockDir);
    }
    fs.writeFile(blockDir + blockRealName + '.jade');

    if(!!block.hasCSS && !fs.existsSync(cssFileName)) {
        fs.writeFile(cssFileName);
    }
    if(!!block.hasJS && !fs.existsSync(jsFileName)) {
        fs.writeFile(jsFileName);
    }
};


function renderTemplate(block) {
    var template  = fs.readFileSync(blocksPath + block.name + '/' + block.name + '.jade');

    var html = jade.compile(template, block.options, function (err, html) {
        if(err){
            console.log(err);
        }
        else {
            return html;
        }
    });
}

function renderIndexPage() {
    function parseTreeEntry (bem_entry){
        console.log(bem_entry.name);
    };

    for (bem_entry in bem_tree) {
        parseTreeEntry()
    }
}

function checkBlocksInTree(bem_tree) {
    for (bem_entry in bem_tree) {
        if(bem_tree[bem_entry].type == 'block'){
            checkBlock(bem_tree[bem_entry]);
            if(!!bem_tree[bem_entry].content) {
                checkBlocksInTree(bem_tree[bem_entry].content);
            }
        }
    }
}

try {

    checkBlocksInTree(bem_tree);
    renderIndexPage();
}
catch(err) {
    if(err){
        console.log(err)
    }
}