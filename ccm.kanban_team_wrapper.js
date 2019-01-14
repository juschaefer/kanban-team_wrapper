/**
 * @overview
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

( function () {

    const component = {

        name: 'kanban-team-wrapper',

        // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',

        config: {
            menu: ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],

            html: {
                "test": ["ccm.load", 'resources/tpl.wrapper.html']
            }
        },

        "jquery": [
            "ccm.load", {
                "url": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
                "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
                "crossorigin": "anonymous"
            }
        ],

        "propper": [
            "ccm.load", {
                "url": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
                "integrity": "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
                "crossorigin": "anonymous"
            }
        ],

        "bootstrap": [
            "ccm.load", {
                "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
                "crossorigin": "anonymous"
            }, {
                "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                "crossorigin": "anonymous"
            }
        ],

        Instance: function () {

            let $, data;
            const self = this;

            this.init = async () => {

                // set shortcut to help functions
                $ = this.ccm.helper;

                // listen to datastore changes => restart
                // if ($.isObject(this.data) && $.isDatastore(this.data.store)) this.data.store.onchange = this.start;

            };

            this.start = async () => {

                const inst_menu = await self.menu.start( {
                    "css": [ "ccm.load", "../../akless-components/menu/resources/tabs.css" ],
                    "data": {
                        "entries": [
                            {
                                "title": "Menu Item A",
                                "content": "Content of menu entry A",
                                "actions": [ [ "console.log", "Performed action of menu entry A." ] ]
                            },
                            {
                                "title": "Menu Item B",
                                "content": "Content of menu entry B",
                                "actions": [ [ "console.log", "Performed action of menu entry B." ] ]
                            },
                            {
                                "title": "Menu Item C",
                                "content": "Content of menu entry C",
                                "actions": [ [ "console.log", "Performed action of menu entry C." ] ]
                            }
                        ]
                    } });

                $.setContent(self.element, inst_menu.root);

            };

        }

    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();