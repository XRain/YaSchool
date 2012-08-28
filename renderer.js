//Подключаем файл со структурой документа, из которой будет генерироваться контент
var pages = require('./pages').getPages();

//Компоненты рендерера
var fs_processor = require('./renderer_components/fs_processor');
var head_renderer = require('./renderer_components/head_renderer');
var body_renderer = require('./renderer_components/body_renderer');

//Вспомогательные переменные
var blocksPath = './blocks/';
var debug = false;

//Компиляция структуры документа в страницы
function compile() {
    for (page in pages) {
        (!!debug)?console.log('Compiling page: ' + currentPage.pageName) : null;
        var currentPageHTML = '';
        var currentPage = pages[page];
        /*
            Обходим папку с блоками, и проверяем все недостающие компоненты,
            отстутствующие создаем.
        */
        fs_processor.processTree(currentPage.bem_tree, blocksPath);
        //Вызываем рендереры для текущей страницы
        currentPageHTML += head_renderer.processTree(currentPage.bem_tree, currentPage.pageName, debug);
        currentPageHTML += body_renderer.processTree(currentPage.bem_tree, debug);
        //Пишем отрендеренную страницу на диск
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