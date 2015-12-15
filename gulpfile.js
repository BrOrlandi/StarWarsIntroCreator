var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
 
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});
 

gulp.task('reload', function () {
  gulp.src(['./public/**/*','!./public/**/*.scss'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./public/**/*','!./public/**/*.scss'],['reload']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});
 
 gulp.task('default', ['sass','connect','watch']);