/**
 * @overview
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

(function () {

    const component = {

        name: 'kanban-team-wrapper',

        config: {

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul"]],
            menu: ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],
            teambuild: ['ccm.component', '../../akless-components/teambuild/ccm.teambuild.js'],
            kanban: ['ccm.component', '../kanban_team_board/ccm.kanban_team_board.js'],

            html: {
                "main": ["ccm.load", 'resources/tpl.wrapper.html']
            },

            bootstrap: ["ccm.load", "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                {
                    "context": "head",
                    "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css"
                },
                // "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                "../kanban_team_wrapper/resources/hbrs.css"
            ],

            // css: ["ccm.load", {
            //     "context": "head",
            //     "url": "../kanban_team_wrapper/resources/hbrs.css"
            // }]
            // "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs.css"]

        },

        // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',

        Instance: function () {

            /**
             * shortcut to help functions
             * @type {Object.<string,function>}
             */
            let $;

            /**
             * own reference for inner functions
             * @type {Instance}
             */
            const self = this;

            this.init = async () => {

                // set shortcut to help functions
                $ = this.ccm.helper;

            };

            this.start = async () => {

                // login user, if not logged in
                await this.user.login();

                const data_server = "http://192.168.99.101:8080";

                const inst_teambuild = await self.teambuild.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-teambuild.css"],
                    "data": {
                        "store": ["ccm.store", {"name": "teams", "url": data_server}],
                        "key": "sose_19"
                    },
                    "user": ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul"]],
                    // "logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", [ "ccm.get", "../kanban_team_wrapper/resources/configs.js", "teambuild_log" ] ]
                });

                console.log("Teambuild", inst_teambuild.data.store.set);

                const inst_kanban = await self.kanban.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-team-board.css"],
                    "data": {
                        "store": ["ccm.store", {"name": "kanban_team_borad", "url": data_server}],
                        "key": "sose_19"
                    },
                    //"logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", [ "ccm.get", "../../akless-components/log/resources/configs.js", "greedy" ] ],
                    // "onchange": function (event) {
                    //     console.log(this.index, 'onchange', this.getValue(), event)
                    // },
                    "ignore": {
                        "card": {
                            "component": "../kanban_team_card/ccm.kanban_team_card.js",
                            "config": {
                                // "css.1": "../kanban_team_wrapper/resources/hbrs-kanban-team-card.css",
                                "data": {
                                    "store": [ "ccm.store", { "name": "kanban_team_cards", "url": "http://192.168.99.101:8080" } ],
                                    "key": "sose_19"
                                },
                                // "data": {
                                //     "store": ["ccm.store"]
                                // },
                                "members": [  ],
                                "priorities": [ "High", "Medium", "Low" ],
                                // "icon": {
                                //     "owner": "../kanban_team_card/resourcess/owner.svg",
                                //     "deadline": "../kanban_team_card/resourcess/deadline.svg"
                                // }
                            }
                        }
                    }
                    // "card": {
                    //     "component": "../kanban_team_card/ccm.kanban_team_card.js",
                    //     // "config": {
                    //     "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-team-card.css"],
                    //     // "data": {
                    //     //     "store": ["ccm.store", {"name": "kanban_team_cards", "url": "http://192.168.99.101:8080"}],
                    //     //     "key": "sose_19"
                    //     // },
                    //     // "data": {
                    //     //     "store": [ "ccm.store", { "store": "kanban_card", "url": "wss://ccm.inf.h-brs.de" } ],
                    //     //     "group": Object.keys( my_team.members ).reduce( ( access,key ) => {
                    //     //         access[ key ] = true; return access; }, {}),
                    //     //     "permission_settings": { "get": "all", "set": "group" }
                    //     // },
                    //     // "members": Object.keys( my_team.members ),
                    //     "members": ["Tik", "Trik", "Trak"],
                    //     "priorities": ["Very High", "High", "Middle", "Low", "Very Low"],
                    //     // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2018/se1/json/log_configs.js', 'se_ws18_kanban_card' ] ]
                    //     // }
                    // }
                });

                const inst_menu = await self.menu.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-menu.css"],
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