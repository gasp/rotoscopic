var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var less = require('gulp-less');
var jasmine = require('gulp-jasmine');

gulp.task('tests', function () {
  return gulp.src('tests/*.js')
    .pipe(jasmine());
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('src/lib/'))
});

gulp.task('install', ['bower'], function() {
  var install = require('./install');
});


gulp.task('serve', ['watch'], function () {
  connect.server({
      root: './src',
      livereload: true,
      middleware: function (connect, opt) {
        console.log('connect version ', connect.version);
        return [
          function (req,res,next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            next();
          }
        ]
      }
    });
  // serving backend
  var debug = require('debug')('api');
  var app = require('./app');
  var server = app.listen(3000, function() {
    debug('Express server listening on port ' + server.address().port);
  });
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