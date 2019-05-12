/**
 * @overview ccm component for tembuild and scrum/kanban workflow
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

(function () {

    const component = {

        name: 'kanban-team-wrapper',

        config: {

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/ccm.user.js"],

            project: "demo",
            data_server: "https://localhost/",
            log_name: null,

            "menu": ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/ccm.menu.js'],
            "teambuild": ['ccm.component', 'https://ccmjs.github.io/akless-components/teambuild/ccm.teambuild.js'],
            "kanban": ['ccm.component', 'https://ccmjs.github.io/akless-components/kanban_board/ccm.kanban_board.js'],
            "comments": ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/ccm.comment.js'],

            teambuild_store: {},
            kanban_board_store: {},
            kanban_card_store: {},

            html: {
                "main": [
                    {
                        "class": "container-fluid",
                        "inner":
                            {
                                "class": "row",
                                "inner": [

                                    {
                                        "class": "col-sm-8 text-center",
                                        "inner": {
                                            "tag": "h2",
                                            "inner": "Kanban - Team Wrapper"
                                        }
                                    },
                                    {
                                        "class": "col-sm-4 text-right",
                                        "inner": {
                                            "id": "user"
                                        }
                                    }

                                ]
                            }
                    },
                    {
                        "tag": "nav"
                    },
                    {
                        "id": "chat"
                    }
                ]
            },

            board_lanes: ["ToDo", "Doing", "Done"],
            board_priorities: ["High", "Medium", "Low"],

            bootstrap: ["ccm.load", "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                {
                    "context": "head",
                    "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css"
                },
                "../kanban_team_wrapper/resources/hbrs.css"
            ]

        },

        // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

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

                // set log_name for datastore if not set
                if (self.log_name === null) {
                    self.log_name = self.project + "_log";
                }

            };

            this.start = async () => {

                // login user, if not logged in
                self.user && await self.user.login();

                self.logger && self.logger.log('start', {user: self.user.data().user});

                // const USER = self.user.data();
                const TEAM = await getMembers(self.user.data().user);

                let team_members = {};

                TEAM.forEach(member => {
                    team_members[member] = true;
                });

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
                    "logger": ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
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
                                "user": true
                            },
                            "join": {
                                "data": true,
                                "user": true
                            },
                            "leave": {
                                "data": true,
                                "user": true
                            },
                            "rename": {
                                "data": true,
                                "user": true
                            }
                        },
                        "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
                        "onfinish": {
                            "store": {
                                "settings": {"name": self.log_name + "_team-board", "url": self.data_server},
                            }
                        },
                    }],
                    "onchange": function (event) {
                        // reload to switch to kanban team board
                        location.reload();
                    },
                    editable: {
                        join: true,		// is allowed to join
                        leave: false,	// not allowed to leave
                        rename: false	// not allowed to edit team name
                    }
                });

                /**
                 * instance for kanban-board component
                 */
                const inst_kanban = await self.kanban.start({
                        "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-kanban-board.css"],
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
                        },
                        "lanes": self.board_lanes,
                        "ignore": {
                            "card": {
                                "component": "../kanban_team_card/ccm.kanban_team_card.js",
                                "config": {
                                    "data": {
                                        // "store": self.kanban_card_store,
                                        // "store": ['ccm.store', {"name": "jschae2s_kanban_team_cards", "url": self.data_server}],
                                        "store": ['ccm.store', {"name": self.kanban_card_store.name, "url": self.kanban_card_store.url}],
                                        "key": self.project
                                    },
                                    "members": TEAM,
                                    "priorities": self.board_priorities,
                                    "logger": ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
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
                                                "user": true
                                            },
                                            "del": {
                                                "data": true,
                                                "user": true
                                            },
                                            "add": {
                                                "data": true,
                                                "user": true
                                            },
                                            "drag": {
                                                "data": true,
                                                "user": true
                                            },
                                            "drop": {
                                                "data": true,
                                                "user": true
                                            }
                                        },
                                        "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
                                        "onfinish": {
                                            "store": {
                                                "settings": {
                                                    "name": self.log_name + "_team-card",
                                                    "url": self.data_server
                                                },
                                            }
                                        }
                                    }]
                                }
                            }
                        },
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
                                    "user": true
                                },
                                "del": {
                                    "data": true,
                                    "user": true
                                },
                                "add": {
                                    "data": true,
                                    "user": true
                                },
                                "drag": {
                                    "data": true,
                                    "user": true
                                },
                                "drop": {
                                    "data": true,
                                    "user": true
                                }
                            },
                            "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
                            "onfinish": {
                                "store": {
                                    "settings": {"name": self.log_name + "_team-board", "url": self.data_server},
                                }
                            },
                        }]
                    });

                const INST_MENU = await self.menu.start({
                    "css": ["ccm.load", "../kanban_team_wrapper/resources/hbrs-menu.css"],
                    "data": {
                        "entries": [
                            {
                                "title": "Team",
                                "content": inst_teambuild.root
                            },
                            {
                                "title": "Board",
                                "content": inst_kanban.root
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

            };

            /**
             *
             * @param user
             * @returns {Promise<any>}
             */
            async function getTeamID(user) {

                // Get Teamstore data
                const team_data = (await self.teambuild_store.get({"_id": self.project}))[0];

                // Reduce to team key of user or null
                return team_data ? team_data.teams.reduce((result, team) => {

                    if (team.members.hasOwnProperty(user)) {
                        result = team.key;
                    }

                    return result
                }, null) : null;
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