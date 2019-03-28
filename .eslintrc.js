module.exports = {
    rules: {
        'strict'                : 'warn',
        'semi'                  : ['warn', 'always'],
        'quotes'                : ['warn', 'single'],
        'indent'                : ['warn', 4, { 'SwitchCase': 1, 'VariableDeclarator': { "var": 1, "let": 1, "const": 1 } }],
        'no-redeclare'          : ['warn', { 'builtinGlobals': true }],
        'no-tabs'               : ['warn', { allowIndentationTabs: false }],
        'space-before-blocks'   : 'warn',
        'space-before-function-paren': 'warn',
        'space-in-parens'       : ['warn', 'never'],
        'space-infix-ops'       : 'warn',
        'space-unary-ops'       : ['warn', { 'words': true, 'nonwords': false }],
        'spaced-comment'        : [0, 'always'],
        'padded-blocks'         : ['warn', { 'blocks': 'never', 'classes': 'always' }],
        'no-mixed-spaces-and-tabs': 'warn',
        'linebreak-style'       : [0, 'unix'],
        'no-lonely-if'          : 'warn',
        'brace-style'           : 'warn',
        'one-var-declaration-per-line': ['warn', 'initializations'],
        'operator-linebreak'    : ['warn', 'before'],
        'for-direction'         : 'warn',
        'getter-return'         : 'warn',
        'no-compare-neg-zero'   : 'warn',
        'no-cond-assign'        : 'warn',
        'no-dupe-args'          : 'warn',
        'no-duplicate-case'     : 'warn',
        'no-ex-assign'          : 'warn',
        'no-extra-boolean-cast' : 'warn',
        'no-extra-semi'         : 'warn',
        'no-unreachable'        : 'warn',
        'no-unsafe-finally'     : 'warn',
        'use-isnan'             : 'warn',
        'valid-typeof'          : 'warn',
        'default-case'          : 'warn',
        'require-jsdoc'         : ['warn', { 'require': {
                                    'FunctionDeclaration': true
                                    , 'MethodDefinition': true
                                    , 'ClassDeclaration': true
                                    , 'ArrowFunctionExpression': true
                                    , 'FunctionExpression': true } }
                                    ],
        'valid-jsdoc': 'warn',
        'switch-colon-spacing': 'warn'
    },
    globals: {

    },
    env: {
        "browser": true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    }
};
