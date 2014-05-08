var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('build', function() {
  gulp.src('./app/front_entry.js', {read: false})
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js', '.jsx'],
      paths: ['./', './node_modules']
    }))
    .on('error', gutil.log)
    .on('error', notify.onError({}))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(gulp.dest('public/js'))
    .pipe(livereload())
    .pipe(notify('bundle built'));
});

gulp.task('clean', function() {
  gulp.src('public', {read: false}).pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch([
    'app/**/*.js',
    'app/**/*.jsx'
  ], ['build']);
});

gulp.task('default', [
  'clean',
  'build',
  'watch'
]);

