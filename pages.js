function getPages() {
    var pages = [
        {
            pageName: 'index',
            bem_tree: [
                {
                    name: 'head',
                    class: 'bl-head',
                    type:'head',
                    hasCSS: true,
                    hasJS: false
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
                            hasCSS: true,
                            hasJS: true,
                            type: 'block'
                        },
                        {
                            name: 'content',
                            class: 'bl-content',
                            hasCSS: true,
                            hasJS: true,
                            type: 'block'
                        }
                    ]
                },
                {
                    name: 'footer',
                    type: 'footer',
                    class: 'bl-footer',
                    hasCSS: true,
                    hasJS: false
                }
            ]
        }
    ];
    return pages;
}


exports.getPages = getPages;