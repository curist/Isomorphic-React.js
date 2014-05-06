var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
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
  /*
  return gulp.src('app/front_entry.js')
    .pipe(browserify({
      'opts.basedir': './',
      transform: [reactify],
      extensions: ['.jsx']
    }))
    .on('error', function(e) {
      console.warn(e);
    })
    .pipe(gulp.dest('public/js'));
  */
});

gulp.task('watch', function() {
  gulp.watch([
    'app/**/*.js',
    'app/**/*.jsx'
  ], ['browserify']);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ignore: [],
    env: { 'NODE_PATH': '.' }
  }).on('change', function() {
    // console.log('change');
  }).on('restart', function() {
    // console.log('restart');
  });
});

gulp.task('default', [
  'watch',
  // 'nodemon'
]);

