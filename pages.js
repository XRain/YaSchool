var questionsContent = generateQuestions();

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
                            content: questionsContent
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
    function compileQuestion(question) {
        this.name = 'question';
        this.class = 'bl-question',
        this.type = 'block',
        this.hasCSS = true,
        this.hasJS = true,
        this.options = {
            id: '',
            question: [{q: question.q, a: question.a}]
        };

    }
    for (i in questions) {
        var compiledQuestion = new compileQuestion(questions[i]);
        compiledQuestion.options.id = compiledQuestion.name + (i + 1);
        compiledQuestions.push(compiledQuestion);
    }
    return compiledQuestions;
}




exports.getPages = getPages;