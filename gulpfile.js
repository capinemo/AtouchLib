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
            example: 'src/js/tests.js',
            global: 'src/js/global/global.functions.js',
            inject: 'src/js/inject/inject.js',
            test: 'src/js/test/test.js',
            storage: 'src/js/storage/storage.js',
            lang: 'src/js/lang/lang.js',
            server: 'src/js/server/server.js',
            unit: 'src/js/unit/unit.js'
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

gulp.task('buildTestsGlobalFunctions', () => {
    return gulp
        .src(path.atouch.src.global)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalInject', () => {
    return gulp
        .src(path.atouch.src.inject)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalTest', () => {
    return gulp
        .src(path.atouch.src.test)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalStorage', () => {
    return gulp
        .src(path.atouch.src.storage)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalLang', () => {
    return gulp
        .src(path.atouch.src.lang)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalServer', () => {
    return gulp
        .src(path.atouch.src.server)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(gulp.dest(path.tests.build.js));
});

gulp.task('buildTestsGlobalUnit', () => {
    return gulp
        .src(path.atouch.src.unit)
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
        .pipe(sourcemaps.init()) // Инициализируем генерацию карты
        .pipe(minify()) // Сжимаем js файлы
        .pipe(sourcemaps.write()) // Дописываем карту
        .pipe(gulp.dest(path.atouch.build.js)); // Кладем в файл сборки
});

gulp.task('buildAtouchExapmle', () => {
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

gulp.task('cleanBuild', () => {
    return rimraf(path.atouch.clean, cb);
});

gulp.task('web', () => {
    return browserSync(configAtouch);
});

gulp.task('buildTests', gulp.series(
    'buildTestsAtouch',
    'buildTestsGlobalFunctions',
    'buildTestsGlobalInject',
    'buildTestsGlobalTest',
    'buildTestsGlobalStorage',
    'buildTestsGlobalLang',
    'buildTestsGlobalServer',
    'buildTestsGlobalUnit',
));

gulp.task('runBuild', gulp.series(
    'buildAtouchJs',
    'buildAtouchExapmle',
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