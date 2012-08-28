/*
    В этом файле задается БЭМ-структура документа,
    по которой будет выполнена сначала генерация
    файловой структуры блоков в папке /blocks, а затем -
    обход всех найденных в структуре блоков, и коммпиляция их клиентского
    JS и CSS

    API:
        pages[head, блок, блок...]
    где блок - структура вида
    {
        name: 'Имя блока',
        type: block  //тип элемента дерева, пока реализованы только блоки
        hasCSS: true, //Если флаг установлен - будет создан и подключен CSS-файл из папки блока
        hasJS: true,   //То же самое с клиентскими js-файлами
        content: [],   //Массив, в который можно добавлять блоки-потомки
        options: {}    //Данные, которые будут переданы jade-шаблону блока при компиляции
    }
 */


function getPages() {
    var pages = [
        {
            pageName: 'index',
            bem_tree: [
                {
                    name: 'head',
                    type:'head',
                    hasCSS: true,
                    hasJS: true
                },
                {
                    name: 'container',
                    class: 'bl-container',
                    type:'block',
                    hasCSS: true,
                    hasJS: false,
                    content: [
                        {
                            name: 'menu',
                            class: 'bl-menu',
                            type: 'block',
                            hasCSS: true,
                            hasJS: true
                        },
                        {
                            name: 'content',
                            class: 'bl-content',
                            type: 'block',
                            hasCSS: true,
                            hasJS: true,
                            content: generateQuestions()
                        }
                    ]
                },
                {
                    name: 'footer',
                    class: 'bl-footer',
                    type: 'footer',
                    hasCSS: true,
                    hasJS: false
                }
            ]
        },
        {
            pageName: 'test',
            bem_tree: [{
                name: 'head',
                class: 'bl-head',
                type:'head',
                hasCSS: true,
                hasJS: true
            },
                {
                    name: 'container',
                    class: 'bl-container',
                    type:'block',
                    hasCSS: true,
                    hasJS: false,
                    content: [
                        {
                            name: 'content',
                            type: 'block',
                            class: 'bl-content',
                            hasCSS: true,
                            hasJS: true
                        }
                    ]
                },
                {
                    name: 'footer',
                    type: 'footer',
                    class: 'bl-footer',
                    hasCSS: true,
                    hasJS: false
                }]
        }
    ];
    return pages;
}

/*Генераторы контента для блоков

 */
function generateQuestions() {
    var compiledQuestions = [];
    var questions = [
        {q: 'Фамилия, имя, отчество', a: 'имя'},
        {q: 'Е-mail', a: 'емайл@уамршра'},
        {q: 'Телефон', a: '984654156'}
    ];
    function compileQuestion(question, position) {
        this.name = 'question';
        this.class = 'bl-question',
        this.type = 'block',
        this.hasCSS = true,
        this.hasJS = true,
        this.options = {
            id: 'question' + (+i + 1),
            question: {q: question.q, a: question.a}
        };
    }
    for (i in questions) {

        var compiledQuestion = new compileQuestion(questions[i], i);
        compiledQuestions.push(compiledQuestion);
    }
    return compiledQuestions;
}




exports.getPages = getPages;