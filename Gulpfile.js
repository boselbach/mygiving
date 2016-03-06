var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    return gulp.src('src/scss/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/assets/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});
