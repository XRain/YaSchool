/*
    Компонент собирает клиентский javascript и css в один файл,
    пишет результат на диск и генерирует head для страницы из jade-шаблона
 */

var fs = require('fs');
var jade = require('jade');
var ams = require('ams');
var pageHead = '';
var debug = false;

//В эти массивы пишутся имена скриптов и CSS-файлов для каждого найденного блока
var userScripts = [];
var userCssFiles = [];

var blocksPath = './blocks/';
var pageName = '';



//запуск обхода дерева
function processTree(bem_tree_node, page, globalDebug) {
    pageName = page;
    debug = globalDebug;
    (!!debug)?console.log('Compiling scripts and styles into <head>') : null;
    for (bem_entry in bem_tree_node) {
        var currentBlock = bem_tree_node[bem_entry];
        parseTreeEntry(currentBlock);
    }
    var content = compileContent(userScripts, userCssFiles);
    return content;
}
/*
    Функция для добавления найденного файла в массив (если его там еще нет)
 */
function addFile(name, type){
    var filePath = blocksPath + name + '/' + name + '.' + type;
    switch(type) {
        case 'js':
            if (!checkFileExists(filePath, userScripts)) {
                userScripts.push(filePath);
            }
            break;
        case 'css':
            if (!checkFileExists(filePath, userCssFiles)) {
                userCssFiles.push(filePath);
            }
            break;
    }
    function checkFileExists(filePath, list) {
        var fileAlreadyAdded = false;
        for (i in list) {
            if(list[i] == filePath) {
                fileAlreadyAdded = true;
            }
        }
        return fileAlreadyAdded;
    }
}
/*
    компиляция и запись клиентских файлов
 */
function compileContent(scripts, css) {
    compileCSS();
    compileJS();
    pageHead = renderHead();
    return pageHead;


    function compileCSS() {
        var build = ams.build.create(blocksPath);
        for (cssFile in css) {
            build.add(css[cssFile]);
        }

        build.process({
            uglifyjs: false, // minify javascript using uglifyjs
            cssvendor: false, // add css vendor prefixes like -webkit, -moz etc.
            dataimage: false, // inline small images using data:image base64 encoded data for css and html
            cssimport: true, // parse @import declarations and inline css files
            cssabspath: false, // absolutize paths in css files (relative to the root)
            htmlabspath: false, // absolutize paths in html files (relative to the root)
            cssmin: true, // minify css using js port of yahoos compressor for css
            jstransport: false, // wrap javascript code in commonjs transport proposal, can be used with requirejs later
            texttransport: false // wrap any data into js transport string, f.e. to load html templates using requirejs from cdn

        });
        build.combine({
            css: pageName + '.css'
        });
        build.write('./pages/assets/css/');
    }
    function compileJS() {
        var build = ams.build.create(blocksPath);
        for (script in scripts) {
            build.add(scripts[script]);
        }
        build.process({
            uglifyjs: true, // minify javascript using uglifyjs
            cssvendor: false, // add css vendor prefixes like -webkit, -moz etc.
            dataimage: false, // inline small images using data:image base64 encoded data for css and html
            cssimport: false, // parse @import declarations and inline css files
            cssabspath: false, // absolutize paths in css files (relative to the root)
            htmlabspath: false, // absolutize paths in html files (relative to the root)
            cssmin: true, // minify css using js port of yahoos compressor for css
            jstransport: false, // wrap javascript code in commonjs transport proposal, can be used with requirejs later
            texttransport: false // wrap any data into js transport string, f.e. to load html templates using requirejs from cdn

        });
        build.combine({
            js: pageName + '.js'
        });
        build.write('./pages/assets/js/');
    }

}
/*
    рекурсивная функция, добавляющая клиентские файлы в очередь на обработку
 */
function parseTreeEntry(currentBlock) {
    if(currentBlock.hasOwnProperty('name') && currentBlock.type == 'block') {
        //(!!debug)?console.log('processing head') : null;
        if (!!currentBlock.hasCSS) {
            addFile(currentBlock.name, 'css');
        }
        if (!!currentBlock.hasJS) {
            addFile(currentBlock.name, 'js');
        }
        if (!!currentBlock.content) {
            for(block in currentBlock.content) {
                parseTreeEntry(currentBlock.content[block]);
            }
        }
    }
}
//рендеринг jade-шаблона
function renderHead() {
    (!!debug)?console.log('rendering head template') : null;
    var jadeData = {name: pageName};
    var templateFile  = fs.readFileSync('./templates/head.jade', 'utf-8');
    var template = jade.compile(templateFile);
    var html = template(jadeData);
    return html;
}

exports.processTree = processTree;