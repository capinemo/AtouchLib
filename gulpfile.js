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
            example: 'src/js/tests.js',
            inject: 'src/js/inject/inject.js',
            injectExtend: 'src/js/inject.extends.js',
            test: 'src/js/test/test.js',
            storage: 'src/js/storage/storage.js',
            server: 'src/js/server/server.js',
            unit: 'src/js/unit/unit.js',
            debug: 'src/js/debug/debug.js',
            editor: 'src/js/editor/editor.js'
        },
        watch : {
            html: 'src/html/**/*.html',
            js: 'src/js/**/*.js'
        },
        clean: './build/'
    },
    tests : {
        build : {
            js: 'test/atouch/'
        },
        test : 'test/index.test.js',
        watch : {
            js: 'src/js/**/*.js'
        },
        clean: './test/'
    }
};

//watch([path.atouch.watch.js, path.atouch.watch.html], build);
//watch([path.editor.watch.html, path.editor.watch.js, path.editor.watch.style, path.editor.watch.img, path.editor.watch.fonts], buildEditor);

gulp.task('buildTestsAtouch', () => {
    return gulp
        .src(path.atouch.src.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsInject', () => {
    return gulp
        .src(path.atouch.src.inject)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsInjectExtend', () => {
    return gulp
        .src(path.atouch.src.injectExtend)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsTest', () => {
    return gulp
        .src(path.atouch.src.test)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsStorage', () => {
    return gulp
        .src(path.atouch.src.storage)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsServer', () => {
    return gulp
        .src(path.atouch.src.server)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsUnit', () => {
    return gulp
        .src(path.atouch.src.unit)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsEditor', () => {
    return gulp
        .src(path.atouch.src.editor)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsDebug', () => {
    return gulp
        .src(path.atouch.src.debug)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildAtouchJs', () => {
    return gulp
        .src(path.atouch.src.js) // Находим главный файл js atouch
        .pipe(eslint()) // Проверяем js скрипты на соответствие правилам оформления
        .pipe(eslint.format()) // Выводим отчет по обнаруженным ошибкам
        .pipe(rigger()) // Подключаем независимые файлы
        //.pipe(sourcemaps.init()) // Инициализируем генерацию карты
        .pipe(minify()) // Сжимаем js файлы
        //.pipe(sourcemaps.write()) // Дописываем карту
        .pipe(gulp.dest(path.atouch.build.js)); // Кладем в файл сборки
});

gulp.task('buildAtouchExample', () => {
    return gulp
        .src(path.atouch.src.example)
        .pipe(gulp.dest(path.atouch.build.js));
});

gulp.task('buildAtouchHtml', () => {
    return gulp
        .src(path.atouch.src.html) // Находим все html файлы
        .pipe(gulp.dest(path.atouch.build.html)) // Кладем в файл сборки
        .pipe(reload({stream: true})); // Перезагружаем сервер для обновлений
});


gulp.task('runTests', () => {
    return gulp
        .src(path.tests.test, {read: false})
        .pipe(mocha({reporter: 'List'}));
});

gulp.task('cleanBuild', (cb) => {
    return rimraf(path.atouch.clean, cb);
});

gulp.task('web', () => {
    return browserSync(configAtouch);
});

gulp.task('buildTests', gulp.series(
    'buildTestsAtouch',
    'buildTestsInject',
    'buildTestsInjectExtend',
    'buildTestsTest',
    'buildTestsStorage',
    'buildTestsServer',
    'buildTestsUnit',
    'buildTestsDebug',
    'buildTestsEditor',
));

gulp.task('runBuild', gulp.series(
    'buildAtouchJs',
    'buildAtouchExample',
    'buildAtouchHtml'
));

gulp.task('test', gulp.series(
    'buildTests',
    'runTests',
));

gulp.task('build', gulp.series(
    'cleanBuild',
    'runBuild',
));