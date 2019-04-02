test_list = {
    'mouse2' : {
        name: 'Mouse events test',
        tasks: [
            {'action':'select','params':{tag: 'select', index: 0, select: '2.0.0'}}, // S
        ],
        result: [0
        ]
    },
    'keyboard' : {
        name: 'Keyboard test',
        tasks: [
            {'action':'print','params':{name: 'user_login', index: 0, input: '1'}}, // S
            {'action':'print','params':{name: 'user_email', index: 0, input: '123456789'}}, // S
            {'action':'print','params':{name: 'user_email', index: 0, input: 'abcdABCDZY'}}, // S
            {'action':'clear','params':{name: 'user_phone', index: 0}}, // S
            {'action':'print','params':{name: 'user_phone', index: 0, input: 'абвгяёжАБВГДЁЯЙ'}}, // S
            {'action':'print','params':{name: 'user_pass', index: 0, input: '/|\\\"\''}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: ',.~!@#$%_-+='}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '^&*()><№;%:?'}}, // S
            {'action':'clear','params':{name: 'user_about', index: 0}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '123#SHIFT#!@#%SHIFT%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'fill','params':{name: 'user_about', index: 0, input: '123#SHIFT#!@#%SHIFT%123#SHIFT#!@#%SHIFT%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1](6)@'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[а-яёА-ЯЁ](1,10)@'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1-9.!@#$](1,10)@'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1-9.!@#$](1,10)@'}}, // S
            {'action':'fill','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1-9.!\'@#$](1,10)@'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1-9.!\'@#$-](1,10)@'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '@[1-4](1,10)@'}}, // S
            {'action':'fill','params':{name: 'user_about', index: 0, input: '#ENTER#%ENTER%'}}, // S
            {'action':'clear','params':{name: 'user_about', index: 0}}, // S
            {'action':'print','params':{name: 'user_about', index: 0, input: '1234554321#BACKSPACE#%BACKSPACE%#ESCAPE#%ESCAPE%#TAB#%TAB%#ENTER#%ENTER%'}}, // S
            {'action':'fill','params':{name: 'user_about', index: 0, input: '1234554321#BACKSPACE#%BACKSPACE%#ESCAPE#%ESCAPE%#TAB#%TAB%#ENTER#%ENTER%'}}, // S
            {'action':'print','params':{name: 'user_phone', index: 0, input: 'ffDD'}}, // S

            {'action':'print','params':{name: 'user_email', index: 0}}, // E 3101
            {'action':'print','params':{name: 'user_phone', index: 0}}, // E 3101
            {'action':'print','params':{id: 'user_phone123', input: 'ffDD'}}, // E 4002
            {'action':'print','params':{name: 'user_phone', index: 3, input: 'ffDD'}}, // E 4002
            {'action':'print','params':''}, // E 4003
            {'action':'print','params':'abcd'} // E 4003
        ],
        result: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
            ,3101,3101,4002,4002,4003,4003
        ]
    },
    'mouse' : {
        name: 'Mouse test',
        tasks: [
            {'action':'scrollto','params':{x: 0, y: 400}}, // S
            {'action':'scrollto','params':{x: 0, y: 0}}, // S
            {'action':'scrollby','params':{x: 0, y: 400}}, // S
            {'action':'scrollby','params':{x: 0, y: 400}}, // S
            {'action':'scrollby','params':{x: 0, y: 400}}, // S
            {'action':'scrollto','params':{x: 0, y: 0}}, // S
            {'action':'scrollto','params':{x: 0, y: 10000}}, // S
            {'action':'scrollto','params':{x: 0, y: -10000}}, // S
            {'action':'scrollby','params':{x: 0, y: 10000}}, // S
            {'action':'scrollby','params':{x: 0, y: -10000}}, // S
            {'action':'scrollto','params':1}, // E 2221
            {'action':'scrollby','params':1}, // E 2221
            {'action':'scrollto'}, // E 2222
            {'action':'scrollby'}, // E 2222

            {'action':'move','params':{x: 0, y: 0}}, // S
            {'action':'move','params':{id: 'first_test_block'}}, // S
            {'action':'move','params':{id: 'zero_test_block'}}, // S
            {'action':'move','params':{id: 'second_test_block'}}, // S
            {'action':'move','params':{id: 'fourth_test_block'}}, // S
            {'action':'move','params':{id: 'key_first'}}, // S
            {'action':'move','params':{}}, // E 2201
            {'action':'move'}, // E 2202
            {'action':'move','params':{id: 'key_first12'}}, // E 4002

            {'action':'click','params':{name: 'user_login', index: 0}}, // S
            {'action':'click','params':{class: 'menu_button', index: 2}}, // S
            {'action':'click','params':{tag: 'select', index: 0}}, // S
            {'action':'click','params':{name: 'user_domens', index: 0}}, // S
            {'action':'click','params':{name: 'user_features', index: 3}}, // S
            {'action':'click','params':{name: 'user_features', index: 2}}, // S
            {'action':'click','params':{name: 'user_using', index: 1}}, // S
            {'action':'click','params':{name: 'user_file', index: 0}}, // S
            {'action':'click','params':{id: 'user_reset'}}, // S
            {'action':'click','params':{class: 'text_link', index: 0}}, // S
            {'action':'click','params':{name: 'user_login', index: 0}}, // S
            {'action':'click','params':{class: 'text_link', index: 5}}, // S
            {'action':'click'}, // E 2202
            {'action':'click','params':{id: 'user_file123'}}, // E 4002
            {'action':'click','params':{name: 'user_file123'}}, // E 4003
            {'action':'click','params':{}}, // E 4003

            {'action':'dblclick','params':{name: 'user_email', index: 0}}, // S
            {'action':'dblclick','params':{class: 'right_float_test', index: 0}}, // S
            {'action':'dblclick','params':{class: 'menu_button', index: 2}}, // S
            {'action':'dblclick','params':{tag: 'select', index: 0}}, // S
            {'action':'dblclick','params':{name: 'user_domens', index: 0}}, // S
            {'action':'dblclick','params':{name: 'user_features', index: 3}}, // S
            {'action':'dblclick','params':{name: 'user_features', index: 2}}, // S
            {'action':'dblclick','params':{name: 'user_using', index: 1}}, // S
            {'action':'dblclick','params':{id: 'user_reset'}}, // S
            {'action':'dblclick','params':{class: 'text_link', index: 0}}, // S
            {'action':'dblclick','params':{name: 'user_login', index: 0}}, // S
            {'action':'dblclick','params':{class: 'text_link', index: 5}}, // S
            {'action':'dblclick'}, // E 2202
            {'action':'dblclick','params':{id: 'user_file123'}}, // E 4002
            {'action':'dblclick','params':{name: 'user_file123'}}, // E 4003
            {'action':'dblclick','params':{}}, // E 4003

            {'action':'focus','params':{name: 'user_email', index: 0}}, // S
            {'action':'down','params':{class: 'menu_button', index: 2}}, // S
            {'action':'up','params':{class: 'menu_button', index: 2}} // S

        ],
        result: [0,0,0,0,0,0,0,0,0,0,2221,2221,2222,2222,0,0,0,0,0,0,2201,2202
            ,4002,0,0,0,0,0,0,0,0,0,0,0,0,2202,4002,4003,4003,0,0,0,0,0,0,0,0,0
            ,0,0,0,2202,4002,4003,4003,0,0,0
        ]
    },
    'browser' : {
        name: 'Browser test',
        tasks: [
            {'action':'go','params':'index.html'}, // S
            {'action':'go','params':''}, // S
            {'action':'go','params':'index.html?test=3'}, // S
            {'action':'go','params':'index.html'}, // S
            {'action':'reload','params':''}, // S
            {'action':'go','params':'index.html?test=4'}, // S
            {'action':'go','params':'index.html?test=3'}, // S
            {'action':'back','params':''}, // S
            {'action':'forward','params':''}, // S
            {'action':'check','params':{class: 'menu_button', index: 0, has: 'Mouse'}}, // S
            {'action':'go','params':123}, // E 1100

            {'action':'check','params':{class: 'menu_button', anyequal: 'Mouse controller'}}, // S
            {'action':'check','params':{class: 'menu_button', anyhas: 'o'}}, // S
            {'action':'check','params':{class: 'menu_button', index: 0, anyequal: 'Mouse controller'}}, // S
            {'action':'check','params':{tag: 'p', index: 0, has: 'page <b>created</b'}}, // S
            {'action':'check','params':{name: 'user_phone', index: 0, has: 'one4'}}, // S
            {'action':'check','params':{tag: 'h1', index: 0, equal: 'C.I.T.Y - Testing page'}}, // S
            {'action':'check','params':{class: 'menu_button', index: 0, equal: 'Mouse controller'}}, // S
            {'action':'check','params':{class: 'menu_button', index: 0, has: 'Mouse'}}, // S
            {'action':'check','params':{id: 'key_first', has: 'test##ENTERit'}}, // S
            {'action':'check','params':{class: 'menu_button', index: 0, has: 'mouse'}}, // E 4000
            {'action':'check','params':{class: 'menu_button', index: 0, equal: 'mouse controller'}}, // E 4000
            {'action':'check','params':{class: 'menu_button', allhas: 'o'}}, // E 4000
            {'action':'check','params':{class: 'menu_button', allequal: 'Mouse controller'}}, // E 4000
            {'action':'check','params':{allequal: 'Mouse controller'}}, // E 4001
            {'action':'check','params':{class: 'menu_button', index: 0}}, // E 4102
            {'action':'check','params':{class: 'menu_button1', index: 0, has: 'Mouse'}}, // E 4002
            {'action':'check','params':{class: 'menu_button', index: 10, has: 'Mouse'}}, // E 4002
            {'action':'check','params':{class: 'menu_button', index: 0, has: [2, 5]}}, // E 4103
            {'action':'check','params':{class: 'menu_button', equal: 'Mouse controller'}}, // E 4104

            {'action':'anyequal','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'allequal','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'equal','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'has','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'allhas','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'anyhas','params':{class: 'menu_button', value: 'Mouse controller'}},
            {'action':'equal','params':{js: 'store.arr', value: ['30', 21, 31, 32, 40], strong: false}},
            {'action':'equal','params':{class: 'store', css: {'color': '#ABC9', 'padding': '7px'}}},
            {'action':'equal','params':{cookie: 'test_cook', value: 'controller'}},

            {'action':'jscheck','params':{vars: 'store', equal: 'My test string'}}, // S
            {'action':'jscheck','params':{vars: 'store1', equal: null}}, // S
            {'action':'jscheck','params':{vars: 'myArr', equal: myArr}}, // S
            {'action':'jscheck','params':{vars: 'myArr', equal: ['30', 21, 31, 32, 40], convert: true}}, // S
            {'action':'jscheck','params':{vars: 'userFunction', type: 'function'}}, // S
            {'action':'jscheck','params':{vars: 'userFunction1', type: 'function'}}, // S
            {'action':'jscheck','params':{vars: 'myArr', type: 'array'}}, // S
            {'action':'jscheck','params':{vars: 'store', type: 'string'}}, // S
            {'action':'jscheck','params':{vars: 'myObj', type: 'object'}}, // S
            {'action':'jscheck','params':{vars: 'right', equal: {a: 1, b: 2}, convert: true}}, // S
            {'action':'jscheck','params':{vars: 'right', equal: {b: 2, a: 1}, convert: true}}, // S
            {'action':'jscheck','params':{vars: 'right', equal: right}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'key', type: 'function'}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.2', type: 'number'}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: 999}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: '999', convert: true}}, // S
            {'action':'jscheck','params':{vars: 'myArr', key: 'length', equal: 5}}, // S
            {'action':'jscheck','params':{vars: 'store', key: 'length', equal: 14}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'option', type: 'object'}}, // S
            {'action':'jscheck','params':{vars: 'store', has: 'test'}}, // S
            {'action':'jscheck','params':{vars: 'myArr', has: 32}}, // S
            {'action':'jscheck','params':{vars: 'myArr', has: 30, convert: true}}, // S
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', has: '9', convert: true}}, // S
            {'action':'jscheck','params':{vars: 'right', equal: {a: 1, b: 2}}}, // E 4000
            {'action':'jscheck','params':{vars: 'right', equal: {b: 2, a: 1}}}, // E 4000
            {'action':'jscheck','params':{vars: 'myArr', equal: ['30', 21, 31, 32, 40]}}, // E 4000
            {'action':'jscheck','params':{vars: 'myObj', equal: 'My test string'}}, // E 4000
            {'action':'jscheck','params':{vars: 'store', equal: null}}, // E 4000
            {'action':'jscheck','params':{vars: 'userFunction', type: 'boolean'}}, // E 4000
            {'action':'jscheck','params':{vars: 'userFunction1', type: 'number'}}, // E 4000
            {'action':'jscheck','params':{vars: 'myArr', type: 'null'}}, // E 4000
            {'action':'jscheck','params':{vars: 'store', type: 'undefined'}}, // E 4000
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: '999'}}, // E 4000
            {'action':'jscheck','params':{vars: 'store1', key: 'length', equal: 2}}, // E 4000
            {'action':'jscheck','params':{vars: 'myArr', has: 30}}, // E 4000
            {'action':'jscheck','params':{vars: 'store', has: 'Test'}}, // E 4000
            {'action':'jscheck','params':{vars: 'store', has: 'Test'}}, // E 4000
            {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', has: '7', convert: true}}, // E 4000
            {'action':'jscheck','params':{equal: {a: 1, b: 2}}}, // E 4200
            {'action':'jscheck','params':{vars: 'store3', equal: 'My test string'}}, // E 4201
            {'action':'jscheck','params':{vars: 'myObj', key: 45, has: '7', convert: true}}, // E 4202
            {'action':'jscheck','params':{vars: 'myObj', key: 'length', equal: 2}}, // E 4203
            {'action':'jscheck','params':{vars: 'right'}}, // E 4204

            {'action':'csscheck','params':{class: 'menu_button', index: 0, has: {'margin-bottom': '10px', 'text-decoration': 'none'}}}, // S
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#006666', 'font-size': '30px'}}}, // S
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#066'}}}, // S
            {'action':'csscheck','params':{class: 'menu_button', index: 0, has: {'padding-right': '10px'}}}, // S
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#066', 'padding': '7px'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#Ab9', 'padding': '7px'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#AS9', 'padding': '7px'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#ABC9', 'padding': '7px'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#006666', 'padding': '7px', 'background': '#e0e0ff'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', index: 0, has: {'color': '#006666', '-webkit-border-radius': '7px'}}}, // E 4000
            {'action':'csscheck','params':{tag: 'h1', has: {'color': '#006666', 'padding': '7px'}}}, // E 4001
            {'action':'csscheck','params':{tag: 'h1', index: 2, has: {'color': '#006666', 'padding': '7px'}}}, // E 4002
            {'action':'csscheck','params':{tag: 'h1'}}, // E 4300

            {'action':'cookcheck','params':{cook: 'test_cook', has: 'controller'}}, // S
            {'action':'cookcheck','params':{cook: 'test_cook_add', has: 'controller'}}, // S
            {'action':'cookcheck','params':{cook: 'test_cook', equal: 'Mouse controller'}}, // S
            {'action':'cookcheck','params':{cook: 'test_cook_add', equal: 'mouse controller'}}, // E 4000
            {'action':'cookdel','params':'test_cook_add'}, // S
            {'action':'cookdel','params':'test_cook_add'}, // E 4402
            {'action':'cookdel','params':123}, // E 4403
            {'action':'cookcheck','params':{cook: 'test_cook_add', has: 'controller'}}, // E 4400
            {'action':'cookcheck','params':{cook: 'test_cook_add', equal: 'mouse controller'}}, // E 4400
            {'action':'cookcheck','params':{equal: 'mouse controller'}}, // E 4400
            {'action':'cookcheck','params':{cook: 'test_cook_add'}} // E 4401
        ],
        result: [0,0,0,0,0,0,0,0,0,0,1100,0,0,0,0,0,0,0,0,0,4000,4000,4000,4000
            ,4001,4102,4002,4002,4103,4104,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
            ,0,0,0,0,0,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000
            ,4000,4000,4000,4000,4200,4201,4202,4203,4204,0,0,0,0,4000,4000
            ,4000,4000,4000,4000,4001,4002,4300,0,0,0,4000,0,4402,4403,4400,4400
            ,4400,4401
        ]
    }
};


/**
[#@%]{1}(?:ENTER|SHIFT|\[.+?\]\([0-9,]+?\))[#@%]{1}

123#SHIFT#123%SHIFT%123#SHIFT#123%SHIFT%
@[123456789.!@#$](1,10)@
@[а-я](1,10)@
@[a-z](3,7)@
@[1](6)@
123#SHIFT#123%SHIFT%
#dsfdf#
@[df](sdf)@
@[а-я](1,10)@as@[а-я](1,10)@
@[1](6)@
123#SH#SHIFT#IFT#123%SHIFT%
#1##SHIFT##1##SHIFT#
123#SHIFT#123%SHIFT%123#CTRL#123%CTRL%

@\[(.+?)\]\(([0-9,]+?)\)@

@[123456789.!@#$](1,10)@
@[а-я](1,10)@
@[a-z](3,7)@
@[1](6)@
@[df](sdf)@
@[а-я](1,10)@as@[а-я](1,10)@
@[1](6)@
 */