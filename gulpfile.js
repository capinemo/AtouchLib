'use strict';

let gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    rimraf = require('rimraf'),
    prefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    wait = require('gulp-wait'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    reload = browserSync.reload;

const { watch, series, parallel } = require('gulp');

const configAtouch = {
    server: {
        baseDir: "./build/"
    },
    tunnel: true,
    host: 'localhost',
    port: 9100,
    logPrefix: "Atouch",
    index: 'index.html'
};

const path = {
    atouch : {
        build : {
            html: 'build/',
            js: 'build/js/'
        },
        src : {
            html: 'src/html/*.html',
            js: 'src/js/atouch.js',
            tests: 'src/js/tests.js',
            global: 'src/js/global/global.functions.js',
            inject: 'src/js/inject/inject.js',
            test: 'src/js/test/test.js',
        },
        watch : {
            html: 'src/html/**/*.html',
            js: 'src/js/**/*.js'
        },
        clean: './build/'
    },
    tests : {
        build : {
            js: 'tests/atouch/'
        },
        test : 'tests/index.js',
        watch : {
            js: 'src/js/**/*.js'
        },
        clean: './tests/'
    }
};

const esrules = {
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
    globals: [

    ],
    envs: [
        'browser'
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    }
};

function web (cb) {
    browserSync(configAtouch);

    cb();
}

// Сборка браузерной библиотеки
function build (cb) {
    gulp.src(path.atouch.src.js) // Находим главный файл js atouch
        .pipe(eslint(esrules)) // Проверяем js скрипты на соответствие правилам оформления
        .pipe(eslint.format()) // Выводим отчет по обнаруженным ошибкам
        .pipe(rigger()) // Подключаем независимые файлы
        .pipe(sourcemaps.init()) // Инициализируем генерацию карты
        .pipe(minify()) // Сжимаем js файлы
        .pipe(sourcemaps.write()) // Дописываем карту
        .pipe(gulp.dest(path.atouch.build.js)); // Кладем в файл сборки

    gulp.src(path.atouch.src.tests)
        .pipe(gulp.dest(path.atouch.build.js));

    gulp.src(path.atouch.src.html) // Находим все html файлы
        .pipe(gulp.dest(path.atouch.build.html)) // Кладем в файл сборки
        .pipe(reload({stream: true})); // Перезагружаем сервер для обновлений

    cb();
}

function buildTests (cb) {
    gulp.src(path.atouch.src.js)
        .pipe(eslint(esrules))
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));

    gulp.src(path.atouch.src.global)
        .pipe(eslint(esrules))
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));

    gulp.src(path.atouch.src.inject)
        .pipe(eslint(esrules))
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));

    gulp.src(path.atouch.src.test)
        .pipe(eslint(esrules))
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));

    cb();
}

function test (cb) {
    gulp.src(path.tests.test, {read: false})
        .pipe(mocha({reporter: 'List'}));

    cb();
}

function clean (cb) {
    rimraf(path.atouch.clean, cb);
    cb();
}

exports.clean = series(clean);
exports.build = series(exports.clean, build);
exports.buildTests = series(buildTests);
//exports.buildAll = series(buildTests, build);
exports.web = series(web);
exports.test = series(buildTests, test);
//exports.run = series(exports.clean, exports.buildAll, exports.web, exports.test);

//watch([path.atouch.watch.js, path.atouch.watch.html], build);
//watch([path.editor.watch.html, path.editor.watch.js, path.editor.watch.style, path.editor.watch.img, path.editor.watch.fonts], buildEditor);