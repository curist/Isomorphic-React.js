var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var clean = require('gulp-clean');

gulp.task('browserify', function() {
  return gulp.src('./app/front_entry.js', {read: false})
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx'],
      paths: ['./', './node_modules']
    }))
    .on('error', function(err){
      console.log(err);
    })
    .pipe(gulp.dest('public/js'));
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

