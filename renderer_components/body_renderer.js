var fs = require('fs');
var jade = require('jade');
var blocksPath = './blocks/';
var debug;

/*
    Запуск обхода дерева
 */
function processTree(bem_tree_node, globalDebug) {
    debug = globalDebug;
    (!!debug)?console.log('Compiling body content from templates') : null;
    var page = '';
    for (bem_entry in bem_tree_node) {
        var currentBlock = bem_tree_node[bem_entry];
        parseTreeEntry(currentBlock, null, returnPage, debug);
    }
    //возвращаем скомпилированный html
    function returnPage(pageContent) {
        page = pageContent;

    }
    return page;
}

/*
    рекурсивная функция для обхода всех блоков в дереве
 */
function parseTreeEntry(currentBlock, parent, callback, debug){
    currentBlock.parent = parent;
    if(currentBlock.hasOwnProperty('name') && currentBlock.type == 'block') {
        //Добавляем к блоку нужные нам методы и переменные
        (!!debug)?console.log('processing block: ' + currentBlock.name) : null;
        currentBlock.childs = [];
        currentBlock.compiledChilds = [];
        currentBlock.childsContent = '';
        //метод, проверяющий, все ли потомки на данный момент скомпилированы
        currentBlock.checkChilds = function(childName) {
            currentBlock.compiledChilds.push(childName);
            if (currentBlock.compiledChilds.length >= currentBlock.childs.length) {
                return true;
                console.log(currentBlock.name, currentBlock.compiledChilds);
            }
            else {
                return false;
            }
        }

        /*callback - функция, компилирующая шаблон для "своего"
            блока и запускающая компиляцию родителя
        */
        currentBlock.compileSelf = function(caller, childContent, parent) {
            //Добавляем контент потомков
            currentBlock.childsContent += childContent;
            //компилируем шаблон
            currentBlock.compiledContent = renderTemplate(currentBlock, currentBlock.childsContent, currentBlock.options);
            //Если все потомки уже скомпилированы - компилим родителя
            if(!!currentBlock.parent && currentBlock.checkChilds()) {
                currentBlock.parent.compileSelf(currentBlock.name, currentBlock.compiledContent, currentBlock.parent.parent);
            }
            //если потомков нет - компилим родителя сразу
            else {
                callback(currentBlock.compiledContent);
            }

        }

        //Если у блока есть потомки - запускаем их обработку
        if (!!currentBlock.content) {
            for (child in currentBlock.content) {
                (!!debug)?console.log('Got ' + currentBlock.content.length + ' children!') : null;
                currentBlock.childs.push(currentBlock.content[child].name);
            }
            for (bem_entry in currentBlock.content) {
                parseTreeEntry(currentBlock.content[bem_entry], currentBlock, callback, debug);
            }
        }
        //нет потомков - начинаем компиляцию
        else {
            currentBlock.compileSelf(currentBlock.name, {name: 'final'}, currentBlock.parent);
        }

    }
};
/*
    Функция для рендеринга jade-шаблона
 */
function renderTemplate(block, childContent, options, callback) {
    (!!debug)?console.log('rendering template for: ' + block.name) : null;
    var jadeData = {name: block.name, content: childContent, options: options, class: block.class}
    var templateFile  = fs.readFileSync(blocksPath + block.name + '/' + block.name + '.jade', 'utf-8');
    var template = jade.compile(templateFile);
    var html = template(jadeData);
    return html;
}


exports.processTree = processTree;




