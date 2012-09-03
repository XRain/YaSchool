/*
    В этом файле задается БЭМ-структура документа,
    по которой будет выполнена сначала генерация
    файловой структуры блоков в папке /blocks, а затем -
    обход всех найденных в структуре блоков, и коммпиляция их клиентского
    JS и CSS
 */


var Block = function(name, options, content) {
    this.type = 'block';

    this.name = name;
    this.class =  'bl-' + name;
    this.options = options;
    if(!!content) {
        this.content = content;
    }
    return;
}

var Head = function() {
    this.name = 'head';
    this.type ='head';
}
//описываем структуру страницы
function getPages() {
    var pages = [
        {
            pageName: 'index',
            bem_tree: [
                new Head(),
                new Block('container', {}, [
                        new Block('content', {}, [
                            new Block('intro', {}),
                            new Block('questions', {}, generateQuestions())
                        ])
                ])
            ]
        }
    ];
    return pages;
}

/*
Генераторы контента для блоков

 */
function generateQuestions() {
    var compiledQuestions = [];
    var questions = [
        {q: 'Фамилия, имя, отчество', a: 'имя'},
        {q: 'Е-mail', a: 'емайл@уамршра'},
        {q: 'Телефон', a: '984654156'}
    ];
    for (i in questions) {
        var compiledQuestion = new Block('question', {
            id: 'question' + (+i),
            question: {q: questions[i].q, a: questions[i].a}
        });
        compiledQuestions.push(compiledQuestion);
    }
    return compiledQuestions;
}




exports.getPages = getPages;