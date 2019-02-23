/**
 * @overview
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

(function () {

    /**
     * defining the data-server for storing data
     * @type {string}
     */
    const DATA_SERVER = "http://192.168.99.101:8080";
    const LOG_NAME = "jschae2s_kanban_team_log";

    const component = {

        name: 'kanban-team-wrapper',

        config: {

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/ccm.user.js"],

            project: "",
            data_server: "https://localhost/",

            "menu": ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/ccm.menu.js'],
            "teambuild": ['ccm.component', 'https://ccmjs.github.io/akless-components/teambuild/ccm.teambuild.js'],
            "kanban": ['ccm.component', '../kanban_team_board/ccm.kanban_team_board.js'],
            "comments": ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/ccm.comment.js'],

            teambuild_store: {},
            kanban_board_store: {},
            kanban_card_store: {},

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

            //    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
            // logger: [ "ccm.instance", "../../akless-components/log/ccm.log.js", {
            logger: ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
                "logging": {
                    "data": true,
                    "browser": true,
                    "parent": true,
                    "root": true,
                    "user": true,
                    "website": true
                },
                "events": {
                    "start": {
                        "data": true,
                        "browser": true,
                        "parent": true,
                        "root": true,
                        "user": true,
                        "website": true
                    }
                },

                "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                "onfinish": {
                    "store": {
                        "settings": {"name": LOG_NAME, "url": DATA_SERVER},
                        // "permissions": {
                        //     "creator": "jschae2s",
                        //     "team": {
                        //         "jschae2s": true,
                        //         "cmann2s": true,
                        //         "lmuell2s": true
                        //     },
                        //     "group": {
                        //         "mkaul2m": true,
                        //         "akless2m": true
                        //     },
                        //     "access": {
                        //         "get": "group",
                        //         "set": "creator",
                        //         "del": "creator"
                        //     }
                        // }
                    }
                },
            }],

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
                $ = self.ccm.helper;

            };

            this.start = async () => {

                // login user, if not logged in
                self.user && await self.user.login();
                // console.log("store", await self.teambuild_store.get(PROJECT));

                self.logger && self.logger.log('start', {user: self.user.data().user});

                const USER = self.user.data();
                const TEAM = await getMembers(self.user.data().user);

                let team_members = {};

                TEAM.forEach(member => {
                    team_members[member] = true;
                });

                const PERMITTSION_GROUPS = {
                    "creator": USER.user,
                    "team": team_members,
                    "admin": {
                        "jschae2s": true,
                        "mkaul2m": true,
                        "akless2m": true
                    }
                };

                console.log("PERMITTSION_GROUPS", PERMITTSION_GROUPS);

                /**
                 * instance for teambuild component
                 */
                const inst_teambuild = await self.teambuild.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-teambuild.css"],
                    "data": {
                        "store": self.teambuild_store,
                        "key": self.project
                    },
                    "user": ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
                        "realm": "guest",
                        "guest": "jschae2s",
                        "title": "Guest Mode: Please enter any username"
                    }],
                    "logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", {
                            // "events": {
                            //     "start": {
                            //         "data": true,
                            //         "user": true
                            //     },
                            //     "join": {
                            //         "data": true,
                            //         "user": true
                            //     }
                            // },
                            "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                            "onfinish": {
                                "store": {
                                    "settings": {"name": LOG_NAME + "_teambuild", "url": DATA_SERVER},
                                    "permissions": {
                                        PERMITTSION_GROUPS,
                                        "access": {
                                            "get": "group",
                                            "set": "creator",
                                            "del": "creator"
                                        }
                                    }
                                }
                            }
                    } ],
                    "onchange": function (event) {
                        console.log("TEAMBUILD CHANGED", event);
                    },
                    editable: {
                        join: true,		// kann beitreten
                        leave: false,	// aber nicht verlassen
                        rename: false	// Teamname ist nicht editierbar
                    }
                });

                /**
                 * instance for kanban-board component
                 */
                const inst_kanban = await self.kanban.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-team-board.css"],
                    "data": {
                        "store": self.kanban_board_store,
                        "key": self.project + "_" + await getTeamID(self.user.data().user)
                    },
                    "team_store": {
                        "store": self.teambuild_store,
                        "key": self.project
                    },
                    "card_store": {
                        "store": self.kanban_card_store
                        // "key": PROJECT
                    },
                    "lanes": ["ToDo", "Doing", "Done"],
                    "members": TEAM,
                    "ignore": {
                        // "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-team-card.css"],
                        // "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-team-card.css"],
                        "card": {
                            "component": "../kanban_team_card/ccm.kanban_team_card.js",
                            "config": {
                                "data": {
                                    // "store": self.kanban_card_store,
                                    "store": ['ccm.store', { "name": "jschae2s_kanban_team_cards", "url": DATA_SERVER }],
                                    "key": self.project
                                },
                                "members": TEAM,
                                "priorities": ["High", "Medium", "Low", "Lowest"],
                            }
                        }
                    },
                    // "logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", {
                    //         "key": "sose_19_teambuild",
                    //         "events": {
                    //             "ready": {
                    //                 "browser": true,
                    //                 "user": true,
                    //                 "website": true
                    //             },
                    //             "start": {
                    //                 "data": true,
                    //                 "user": true
                    //             },
                    //             "join": {
                    //                 "data": true,
                    //                 "user": true
                    //             },
                    //             "leave": {
                    //                 "data": true,
                    //                 "user": true
                    //             },
                    //             "rename": {
                    //                 "data": true,
                    //                 "user": true
                    //             }
                    //         },
                    //         "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                    //         "onfinish": {
                    //             "store_settings": { "store": "teambuild_log", "url": DATA_SERVER },
                    //             "permissions": {
                    //                 "creator": "jschae2s",
                    //                 "group": {
                    //                     "jschae2s": true
                    //                     // "mkaul2m": true,
                    //                     // "akless2m": true
                    //                 },
                    //                 "access": {
                    //                     "get": "group",
                    //                     "set": "creator",
                    //                     "del": "creator"
                    //                 }
                    //             }
                    //         }
                    // } ],
                });

                const INST_MENU = await self.menu.start({
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
                    },
                    "selected": selected = TEAM.length > 0 ? 2 : 1
                });

                // adds main html structure
                $.setContent(self.element, $.html(self.html.main));

                // adding user component to content
                $.setContent(self.element.querySelector('#user'), self.user.root);

                const nav = self.element.querySelector('nav');
                $.setContent(nav, INST_MENU.root);

                const chat = await self.comments.start({
                    "chat": true,
                    "template": "simple",
                    "user": [
                        "ccm.instance",
                        "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
                        {
                            "key": "button",
                            "realm": "guest",
                            "title": "Guest Mode: Please enter any username",
                            "html.logged_in": {
                                "id": "logged_in",
                                "class": "row",
                                "style": "float:none",
                                "inner": {
                                    "id": "button",
                                    "class": "btn btn-default",
                                    "inner": [
                                        {
                                            "tag": "span",
                                            "id": "user",
                                            "inner": [
                                                {
                                                    "class": "glyphicon glyphicon-user"
                                                },
                                                "%user%&#8196;"
                                            ]
                                        },
                                        {
                                            "tag": "span",
                                            "class": "glyphicon glyphicon-log-out"
                                        },
                                        "Logout"
                                    ],
                                    "onclick": "%click%"
                                }
                            },
                            "html.logged_out": {
                                "id": "logged_out",
                                "style": "float:none",
                                "inner": {
                                    "id": "button",
                                    "class": "btn btn-default",
                                    "inner": [
                                        {
                                            "tag": "span",
                                            "class": "glyphicon glyphicon-log-in"
                                        },
                                        "Login"
                                    ],
                                    "onclick": "%click%"
                                }
                            }
                        }
                    ],
                    "data": {
                        "store": [
                            "ccm.store",
                            {
                                "name": "jschae2s_chat_data",
                                "url": DATA_SERVER
                            }
                        ],
                        "key": self.project
                        // "key": "1550423630626X27889468838847464"
                    }
                });

                $.setContent(self.element.querySelector("#chat"), chat.root);

            };

            /**
             *
             * @param user
             * @returns {Promise<any>}
             */
            async function getTeamID(user) {

                // console.log("teambuild_store", self.teambuild_store);

                // Get Teamstore data
                const team_data = (await self.teambuild_store.get({"_id": self.project}))[0];
                // const team_data = (await self.teambuild_store.get())[0];

                // console.log("team_data", team_data);

                // if (team_data) {
                // Reduce to team key of user or null
                return team_data ? team_data.teams.reduce((result, team) => {
                    // console.log("team", team);
                    if (team.members.hasOwnProperty(user)) {
                        // console.log("Funne", team.key);
                        result = team.key;
                    }

                    return result
                }, null) : null;
                // }
                //
                // return null;
            }

            /**
             * Returns all Group-Members from own team
             * @param user
             * @returns {Promise<Array>}
             */
            async function getMembers(user) {

                let users = [];

                const data = await self.teambuild_store.get(self.project);

                if (data !== null) {
                    data['teams'].forEach((group, index, data_teamstore) => {
                        if (group.members.hasOwnProperty(user)) {
                            users = Object.keys(group.members).map((key) => {
                                return key;
                            });
                        }
                    });
                }

                return users;

            }

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