var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');

var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var watch = require('gulp-watch');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');

var scriptsDir = './src/js';
var buildDir = './build';


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        entries: [scriptsDir + '/' + file],
        debug: true,
        cache: {},
        packageCache: {},
    };
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(reactify);
    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', console.log.bind(console))
            .pipe(source(file))
            .pipe(gulp.dest(buildDir + '/'));
    }
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}

gulp.task('less', function () {
    return gulp.src('./src/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./build'));
});

gulp.task('js', function() {
    return buildScript('app.js', false);
});



gulp.task('watch', function() {
    gulp.watch('./src/less/*.less', ['less']);
    return buildScript('app.js', true);
});

gulp.task('default', ['watch']);