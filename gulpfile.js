var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    manifest = require('gulp-manifest'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    watch = require('gulp-watch'),
    rename = require("gulp-rename");

gulp.task('default', ['user', 'htmlMinify', 'buildcss']);

// concat and minify js files
gulp.task('user', function() {
    return gulp.src(['assets/js/**/*.js'])
        .pipe(concat('key-app.min.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('assets/js/build/'))
});

// minify html files
gulp.task('htmlMinify', function() {
    return gulp.src('partials/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: false,
            removeEmptyElements: false
        }))
        .pipe(gulp.dest('min_partials/'))
});

// concat and minify css files
gulp.task('buildcss', function() {
    gulp.src('sass/main.scss')
        .pipe(concat('key-app.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('watch', function() {
    gulp.watch('sass/main.scss', ['buildcss']);
    gulp.watch(['assets/js/**/*.js'], ['user']);
    gulp.watch('partials/**/*.html', ['htmlMinify']);
});
