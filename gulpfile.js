var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function() {
  return browserify({
    entries: ['./app/front_entry.js'],
    extensions: ['.jsx'],
    transform: [reactify],
    paths: ['./', './node_modules']
  })
  .bundle()
  .on('error', function(e) { console.log(e); })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public/js'))
  ;
});

gulp.task('watch', function() {
  gulp.watch([
    'app/**/*.js',
    'app/**/*.jsx'
  ], ['browserify']);
});

gulp.task('default', [
  'watch'
]);

