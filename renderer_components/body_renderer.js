var fs = require('fs');
var jade = require('jade');
var blocksPath = './blocks/';
var debug;


function processTree(bem_tree_node, globalDebug) {
    debug = globalDebug;
    (!!debug)?console.log('Compiling body content from templates') : null;
    var page = '';
    for (bem_entry in bem_tree_node) {
        var currentBlock = bem_tree_node[bem_entry];
        parseTreeEntry(currentBlock, null, returnPage, debug);
    }

    function returnPage(pageContent) {
        page = pageContent;
    }
    return page;
}

function parseTreeEntry(currentBlock, parent, callback, debug){
    currentBlock.parent = parent;
    if(currentBlock.hasOwnProperty('name') && currentBlock.type == 'block') {
        (!!debug)?console.log('processing block: ' + currentBlock.name) : null;
        currentBlock.childsContent = '';
        //callback function
        currentBlock.compileSelf = function(childContent, parent) {
            currentBlock.childsContent += childContent;
            (!!debug)?console.log('Compiling block: ' + currentBlock.name) : null;
            currentBlock.tempContent = childContent;
            currentBlock.compiledContent = renderTemplate(currentBlock, currentBlock.childsContent, null);
            if(!!currentBlock.parent) {
                currentBlock.parent.compileSelf(currentBlock.compiledContent);
            }
            else {
                callback(currentBlock.compiledContent);
            }
        }


        if (!!currentBlock.content) {
            var childContent = '';
            for (bem_entry in currentBlock.content) {
                childContent = parseTreeEntry(currentBlock.content[bem_entry], currentBlock, callback, debug);
            }
        }
        else {
            currentBlock.compileSelf({name: 'final'}, currentBlock.parent);
        }
    }
};

function renderTemplate(block, childContent, options, callback) {
    (!!debug)?console.log('rendering template for: ' + block.name) : null;
    var jadeData = {name: block.name, content: childContent, options: options, class: block.class}
    var templateFile  = fs.readFileSync(blocksPath + block.name + '/' + block.name + '.jade', 'utf-8');
    var template = jade.compile(templateFile);
    var html = template(jadeData);
    return html;
}


exports.processTree = processTree;




