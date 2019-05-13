/**
 * @overview configurations of ccm component for kanban team app
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

const LOCAL_DATA_SERVER = "http://192.168.99.101:8080";
const HBRS_CCM2_DATA_SERVER = "https://ccm2.inf.h-brs.de";

ccm.files['configs.js'] = {

    "local": {
        "key": "local",
        "project": "jschae2s_sose_19_prototyp",
        "data_server": LOCAL_DATA_SERVER,

        "user": ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
            "realm": "guest",
            "guest": "jschae2s",
            // "guest": "lweiss2s",
            // "guest": "jkraus2s",
            //
            // "guest": "tmoell2s",
            // "guest": "pfried2s",
            // "guest": "jmahle2s",
            // "guest": "cdresn2s",
            //
            // "guest": "rdrech2s",
            // "guest": "sfassb2s",

            "title": "Guest Mode: Please enter any username"
        }],
        "menu": ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],
        "teambuild": ['ccm.component', 'https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js'],
        "kanban": ['ccm.component', 'https://ccmjs.github.io/akless-components/kanban_board/ccm.kanban_board.js'],
        "comments": ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.1.0.js'],

        "teambuild_store": ['ccm.store', {"name": "jschae2s_teambuild", "url": LOCAL_DATA_SERVER}],
        "kanban_board_store": ['ccm.store', {"name": "jschae2s_kanban_team_borad", "url": LOCAL_DATA_SERVER}],
        "kanban_card_store": ['ccm.store', {"name": "jschae2s_kanban_team_cards", "url": LOCAL_DATA_SERVER}],

        "board_lanes": ["ToDo", "Doing", "Done"],
        "board_priorities": ["High", "Medium", "Low"],

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
                    "browser": true,
                    "parent": true,
                    "root": true,
                    "user": true,
                    "website": true
                }
            },
            "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
            "onfinish": {
                "store": {
                    "settings": {"name": "jschae2s_sose_19_prototyp_log", "url": LOCAL_DATA_SERVER},
                }
            }
        }]
    },

    "jschae2s_demo": {
        "key": "jschae2s_demo",
        "project": "jschae2s_demo",
        "data_server": HBRS_CCM2_DATA_SERVER,

        "user": ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
            "realm": "guest",
            "guest": "jschae2s",
            // "guest": "lweiss2s",
            // "guest": "jkraus2s",
            //
            // "guest": "tmoell2s",
            // "guest": "pfried2s",
            // "guest": "jmahle2s",
            // "guest": "cdresn2s",
            //
            // "guest": "rdrech2s",
            // "guest": "sfassb2s",

            "title": "Guest Mode: Please enter any username"
        }],
        "menu": ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],
        "teambuild": ['ccm.component', 'https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js'],
        "kanban": ['ccm.component', 'https://ccmjs.github.io/akless-components/kanban_board/ccm.kanban_board.js'],
        "comments": ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.1.0.js'],

        "teambuild_store": ['ccm.store', {"name": "jschae2s_teambuild", "url": HBRS_CCM2_DATA_SERVER}],
        "kanban_board_store": ['ccm.store', {"name": "jschae2s_kanban_team_borad", "url": HBRS_CCM2_DATA_SERVER}],
        "kanban_card_store": ['ccm.store', {"name": "jschae2s_kanban_team_cards", "url": HBRS_CCM2_DATA_SERVER}],

        "board_lanes": ["ToDo", "Doing", "Done"],
        "board_priorities": ["High", "Medium", "Low"],

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
                    "browser": true,
                    "parent": true,
                    "root": true,
                    "user": true,
                    "website": true
                }
            },
            "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
            "onfinish": {
                "store": {
                    "settings": {"name": "jschae2s_demo_log", "url": HBRS_CCM2_DATA_SERVER},
                }
            }
        }]
    }

};