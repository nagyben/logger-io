var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');

gulp.task('jslibs', function() {
  gulp.src('**/bower_components/**/*min.js')
  .pipe(flatten())
  .pipe(gulp.dest('./frontend/js/lib'));
});

gulp.task('csslibs', function() {
  gulp.src('**/bower_components/**/bootstrap.min.css')
  .pipe(flatten())
  .pipe(gulp.dest('./frontend/css/lib'));
});

gulp.task('sass', function() {
  gulp.src('**/frontend/sass/*.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(flatten())
  .pipe(gulp.dest('frontend/css'));
});

gulp.task('watch', function() {
  gulp.watch('**/frontend/sass/*.scss', ['sass']);
});

// gulp.task('js', function() {
//   gulp.src('dev/scripts/*.js')
//   .pipe(uglify())
//   .pipe(concat('script.js'))
//   .pipe(gulp.dest('static/js'));
// });
