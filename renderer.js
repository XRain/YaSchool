var pages = require('./pages').getPages();
var fs_processor = require('./renderer_components/fs_processor');
var head_renderer = require('./renderer_components/head_renderer');
var body_renderer = require('./renderer_components/body_renderer');
var blocksPath = './blocks/';


function compile() {
    for (page in pages) {
        var pageHTML = '', pageCSS, pageJS;
        fs_processor.processTree(pages[page].bem_tree, blocksPath);
        //pageHTML += head_renderer.processTree(page.bem_tree);
        pageHTML += body_renderer.processTree(pages[page].bem_tree);
        console.log('Got rendered page: ' + pageHTML);
    }
    var indexPageContent = '';
}


try {
    compile();
}
catch(err) {
    if(err){
        console.log(err)
    }
}