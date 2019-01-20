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

    "vm": {
        "key": "vm",
        "css": "../kanban_team_wrapper/resources/hbrs.css",
        // "data": {
        //     "store": [
        //         "ccm.store", {
        //             "name": "kanban_team_wrapper",
        //             "url": "http://192.168.99.101:8080"
        //         }],
        //     "key": "kanban_team_wrapper"
        // }
    },

    "teambuild_log": {
        // "se_ws17_teambuild": {  // created for ccm.log-1.0.0.js, ccm.teambuild-1.0.0.js, ccm.user-2.0.0.js
            "key": "teambuild_log",
            "events": {
                "ready": {
                    "browser": true,
                    "user": true,
                    "website": true
                },
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
            "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
            "onfinish": {
                "store_settings": { "store": "teambuild_log", "url": "http://192.168.99.101:8080" },
                "permissions": {
                    // "creator": "akless2m",
                    "creator": "jschae2s",
                    "group": {
                        "mkaul2m": true,
                        "akless2m": true,
                        "jschae2s": true
                    },
                    "access": {
                        "get": "group",
                        "set": "creator",
                        "del": "creator"
                    }
                }
            }
        // }
    }

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