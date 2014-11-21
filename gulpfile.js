var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var less = require('gulp-less');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('src/lib/'))
});

gulp.task('install', ['bower'], function() {
  console.log("todo");
});


gulp.task('serve', ['watch'], function () {
  connect.server({
      root: './src',
      livereload: true
    });
  var app = require('./app')
});

gulp.task('html', function () {
  console.log("html updated");
  gulp.src('./src/**.html')
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src(['./src/less/app.less', './src/less/bootstrap.less'])
    .pipe(less()) // should use paths: [ path.join(__dirname, 'src', 'includes') ]
    .pipe(gulp.dest('./src/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**.html'], ['html']);
  gulp.watch(['./src/less/*.less'], ['less']);
});


 gulp.task('default', function(){
   
 });