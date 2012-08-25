var questionsNumber = 9;
function getStructure() {
    var structure = {
        head: {
            name: 'bl-head',
            type:'head',
            content: null
        },
        container: {
            name: 'bl-container',
            type:'block',
            hasCSS: true,
            hasJS: false,
            content: {
                menu: {
                    name: 'bl-menu',
                    hasCSS: true,
                    hasJS: true,
                    type: 'block',
                    content:null
                },
                content: {
                    name: 'bl-content',
                    hasCSS: true,
                    hasJS: true,
                    type: 'block',
                    content:null
                }
            }
        },
        footer: {
            name: 'bl-footer',
            clientscripts: 0
        }
    };
    return structure;
}


exports.getStructure = getStructure;