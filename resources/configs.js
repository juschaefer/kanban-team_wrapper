/**
 * @overview configurations of ccm component for kanban team app
 * @author Julian Schäfer <julian.schaefer@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files['configs.js'] = {

    "local": {
        "key": "local",
        // "css": [ "ccm.load", "../kanban_team_wrapper/resources/hbrs.css"],
        "css": [ "ccm.load",
            // "../kanban_team_wrapper/node_modules/bootstrap/dist/css/bootstrap.css",
            { "context": "head", "url": "../kanban_team_wrapper/resources/hbrs.css" }],
        // "css": "default.css",
        // "data": {
        //     "store": ["ccm.store", "datasets.js"],
        //     "key": "kanban_team_wrapper"
        // }
    },

    "demo": {
        "key": "demo",
        "css": "default.css",
        "data": {
            "store": [
                "ccm.store", {
                    "name": "kanban_team_wrapper",
                    "url": "https://ccm2.inf.h-brs.de"
                }],
            "key": "kanban_team_wrapper"
        }
    },

    "realtime": {
        "key": "realtime",
        "css": "default.css",
        "data": {
            "store": [
                "ccm.store", {
                    "name": "kanban_team_wrapper",
                    "url": "wss://ccm2.inf.h-brs.de"
                }],
            "key": "kanban_team_wrapper"
        }
    },

    // "menu": {
    //     "key": "menu",
    //     "css": [ "ccm.load", "../../../akless-components/menu/resources/tabs.css" ],
    //     "data": {
    //         "entries": [
    //             {
    //                 "title": "Menu Item A",
    //                 "content": "Content of menu entry A",
    //                 "actions": [["console.log", "Performed action of menu entry A."]]
    //             },
    //             {
    //                 "title": "Menu Item B",
    //                 "content": "Content of menu entry B",
    //                 "actions": [["console.log", "Performed action of menu entry B."]]
    //             },
    //             {
    //                 "title": "Menu Item C",
    //                 "content": "Content of menu entry C",
    //                 "actions": [["console.log", "Performed action of menu entry C."]]
    //             }
    //         ]
    //     }
    //     // "data": {
    //     //     "store": [ "ccm.store", "../kanban_team_wrapper/resources/datasets.js" ],
    //     //     "key": "demo"
    //     // },
    //     // "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ]
    // }

};