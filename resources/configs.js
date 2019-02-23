/**
 * @overview configurations of ccm component for kanban team app
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

const LOCAL_DATA_SERVER = "http://192.168.99.101:8080";

ccm.files['configs.js'] = {

    "local": {
        "key": "local",
        // "project": "jschae2s_bsc_sose_19",
        "project": "jschae2s_sose_19",

        "user": ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", {
            "realm": "guest",
            "guest": "jschae2s",
            // "guest": "sschae2s",
            // "guest": "cmann2s",

            // "guest": "arindt2s",
            // "guest": "lmuell2s",
            // "guest": "tmann2s",

            // "guest": "agersa2s",
            // "guest": "wschae2s",
            "title": "Guest Mode: Please enter any username"
        }],
        "menu": ['ccm.component', 'https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.3.js'],
        "teambuild": ['ccm.component', 'https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js'],
        "kanban": ['ccm.component', '../kanban_team_board/ccm.kanban_team_board.js'],
        "comments": ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.1.0.js'],

        "teambuild_store":      ['ccm.store', {"name": "jschae2s_teambuild",         "url": LOCAL_DATA_SERVER}],
        "kanban_board_store":   ['ccm.store', {"name": "jschae2s_kanban_team_borad", "url": LOCAL_DATA_SERVER}],
        "kanban_card_store":    ['ccm.store', {"name": "jschae2s_kanban_team_cards", "url": LOCAL_DATA_SERVER}],
    }

};