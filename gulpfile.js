var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('copy', function() {
  gulp.src('dev/index.html')
  .pipe(gulp.dest('static'));
});

gulp.task('sass', function() {
  gulp.src('dev/*.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('static/css'));
});

gulp.task('js', function() {
  gulp.src('dev/scripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('static/js'));
});
