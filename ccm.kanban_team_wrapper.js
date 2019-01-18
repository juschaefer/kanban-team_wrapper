/**
 * @overview
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

(function () {

    const component = {

        name: 'kanban-team-wrapper',

        config: {
            user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul" ] ],
            menu: ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],
            teambuild: ['ccm.component', '../../akless-components/teambuild/ccm.teambuild.js'],
            kanban: ['ccm.component', '../kanban_team_board/ccm.kanban_team_board.js'],

            html: {
                "main": ["ccm.load", 'resources/tpl.wrapper.html']
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

        // "jquery": [
        //     "ccm.load", {
        //         "url": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        //         "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
        //         "crossorigin": "anonymous"
        //     }
        // ],
        //
        // "propper": [
        //     "ccm.load", {
        //         "url": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        //         "integrity": "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
        //         "crossorigin": "anonymous"
        //     }
        // ],
        //
        // "bootstrap_css": [
        //     "ccm.load", {
        //         "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
        //         "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
        //         "crossorigin": "anonymous"
        //     }
        //     // }, {
        //     //     "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
        //     //     "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
        //     //     "crossorigin": "anonymous"
        //     // }
        // ],
        //
        // "bootstrap_js‚": [
        //     "ccm.load", {
        //     //     "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
        //     //     "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
        //     //     "crossorigin": "anonymous"
        //     // }, {
        //         "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
        //         "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
        //         "crossorigin": "anonymous"
        //     }
        // ],

        // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',

        Instance: function () {

            let $;
            const self = this;

            this.init = async () => {

                // set shortcut to help functions
                $ = this.ccm.helper;

            };

            this.start = async () => {

                // login user, if not logged in
                await this.user.login();

                const inst_teambuild = await  self.teambuild.start({
                    "localhost": {
                        "key": "localhost",
                        "css": [ "ccm.load", "../../akless-components/teambuild/resources/default.css" ],
                        "data": {
                            "store": [ "ccm.store", "../kanban_team_board/resources/datasets.js" ],
                            "key": "teambuild_data"
                        },
                        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul" ] ],
                        // "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
                    },
                });

                const inst_kanban = await self.kanban.start({
                    "key": "local",
                    "css.1": "../kanban_team_board/resources/default.css",
                    "data": {
                        "store": [ "ccm.store", "../kanban_team_board/resources/datasets.js" ],
                        "key": "test"
                    },
                    //"logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", [ "ccm.get", "../../akless-components/log/resources/configs.js", "greedy" ] ],
                    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
                    "ignore": {
                        "card": {
                            "component": "../kanban_team_card/ccm.kanban_team_card.js",
                            "config": {
                                "css.1": "../kanban_team_card/resources/default.css",
                                "data": {
                                    "store": [ "ccm.store" ]
                                },
                                "icon": {
                                    "owner": "../kanban_team_card/resources/owner.svg",
                                    "deadline": "../kanban_team_card/resources/deadline.svg"
                                }
                            }
                        }
                    }
                });

                const inst_menu = await self.menu.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-tabs.css"],
                    "data": {
                        "entries": [
                            {
                                "title": "Team",
                                "content": inst_teambuild.root
                                // "actions": [ [ "console.log", "Performed action of menu entry A." ] ]
                            },
                            {
                                "title": "Board",
                                "content": inst_kanban.root
                                // "actions": [ [ "console.log", "Performed action of menu entry B." ] ]
                            }
                        ]
                    }
                });

                $.setContent(self.element, $.html(self.html.main));

                $.setContent(self.element.querySelector('#user'), self.user.root);

                const nav = self.element.querySelector('nav');
                $.setContent(nav, inst_menu.root);

            };

        }
        // }

    };

    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component;
    (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = {url: component.ccm});
    let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || ["latest"])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            window.ccm[c].component(component);
            document.head.removeChild(a)
        };
        a.src = component.ccm.url
    }
})();