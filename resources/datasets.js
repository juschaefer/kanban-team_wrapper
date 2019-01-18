/**
 * @overview datasets of ccm component for rendering a menu
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

"menu": {
    "key": "menu",
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
},
"teambuild_data": {
    // "_id": "teambuild_data",
    "teams": [
        {
            "key": "1536394214965X9312468445512434",
            "members": {
                "john": true,
                "mkaul": true,
                "test": true
            }
        },
        {
            "key": "1541598607325X727841449552181",
            "members": {
                "akless": true,
                "jane": true
            }
        },
        {
            "key": "1547300773593X5909761414733548",
            "members": {}
        }
        ]
    // ],
    // "updated_at": "2019-01-12T14:46:14+01:00",
    // "created_at": "2018-09-08T10:10:16+02:00",
}
};