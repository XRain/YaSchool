var fs = require('fs');
var jade = require('jade');
var blocksPath = './blocks/';



function processTree(bem_tree_node) {
    var pageContent = '';
    for (bem_entry in bem_tree_node) {
        var currentBlock = bem_tree_node[bem_entry];
        parseTreeEntry(currentBlock, null);
    }
}

function parseTreeEntry(currentBlock, parent){
    currentBlock.parent = parent;
    if(currentBlock.hasOwnProperty('name') && currentBlock.type == 'block') {
        console.log('processing bem entry: ' + currentBlock.name);
        currentBlock.childsContent = '';
        //callback function
        currentBlock.compileSelf = function(childContent, parent) {
            currentBlock.childsContent += childContent;
            console.log('Compiling block: ' + currentBlock.name);
            console.log('Got child content: ' + childContent);
            currentBlock.tempContent = childContent;
            currentBlock.compiledContent = renderTemplate(currentBlock, currentBlock.childsContent, null);
            console.log('Compiled content: ' + currentBlock.compiledContent);
            if(!!currentBlock.parent) {
                currentBlock.parent.compileSelf(currentBlock.compiledContent);
            }
            else {
                pageContent = currentBlock.compiledContent;
            }
        }


        if (!!currentBlock.content) {
            var childContent = '';
            for (bem_entry in currentBlock.content) {
                childContent = parseTreeEntry(currentBlock.content[bem_entry], currentBlock);
            }
        }
        else {
            currentBlock.compileSelf({name: 'final'}, currentBlock.parent);
        }
    }
};

function renderTemplate(block, childContent, options, callback) {
    console.log('rendering template for: ' + block.name);
    var jadeData = {name: block.name, content: childContent, options: options, class: block.class}
    var templateFile  = fs.readFileSync(blocksPath + block.name + '/' + block.name + '.jade', 'utf-8');
    var template = jade.compile(templateFile);
    var html = template(jadeData);
    return html;
}


exports.processTree = processTree;




