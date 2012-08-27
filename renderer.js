var pages = require('./pages').getPages();
var fs_processor = require('./renderer_components/fs_processor');
var head_renderer = require('./renderer_components/head_renderer');
var body_renderer = require('./renderer_components/body_renderer');
var blocksPath = './blocks/';
var debug = true;

function compile() {
    for (page in pages) {
        var currentPageHTML = '';
        var currentPage = pages[page];
        (!!debug)?console.log('Compiling page: ' + currentPage.pageName) : null;

        fs_processor.processTree(currentPage.bem_tree, blocksPath);
        currentPageHTML += head_renderer.processTree(currentPage.bem_tree, currentPage.pageName, debug);
        currentPageHTML += body_renderer.processTree(currentPage.bem_tree, debug);
        fs_processor.writeTo('./pages/', currentPage.pageName + '.html', currentPageHTML);
    }
}

compile();

/*
try {
    compile();
}
catch(err) {
    if(err){
        console.log(err)
    }
}
    */