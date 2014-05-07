var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var clean = require('gulp-clean');
var notify = require('gulp-notify');

gulp.task('browserify', function() {
  return gulp.src('./app/front_entry.js', {read: false})
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js', '.jsx'],
      paths: ['./', './node_modules']
    }))
    .on('error', gutil.log)
    .on('error', notify.onError({}))
    .pipe(gulp.dest('public/js'))
    .pipe(notify('browserified'));
});


gulp.task('clean', function() {
  return gulp.src('public', {read: false}).pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch([
    'app/**/*.js',
    'app/**/*.jsx'
  ], ['browserify']);
});

gulp.task('build', ['browserify']);

gulp.task('default', [
  'clean',
  'build',
  'watch'
]);

