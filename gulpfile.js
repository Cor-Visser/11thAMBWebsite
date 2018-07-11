//----------------------------------------
//    Requirements
//----------------------------------------

var gulp          =         require('gulp');
var sass          =         require('gulp-sass');
var rename        =         require('gulp-rename');
var plumber       =         require('gulp-plumber');
var uglify        =         require('gulp-uglifycss');
var browserSync   =         require('browser-sync').create();

//----------------------------------------
//    Tasks
//----------------------------------------

  // Compile SASS
  gulp.task('compile-sass', function() {
    return gulp.src('./resource/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./asset/styles'))
      .pipe(browserSync.stream());
  });

  // Compile JavaScript
  gulp.task('compile-js', function() {
    gulp.src('./resource/js/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./asset/scripts'))
      .pipe(browserSync.stream());
  });

  // Move Vendors
  gulp.task('move-vendors', function() {
    gulp.src('./resource/js/vendors/**/*.js')
      .pipe(plumber())
      .pipe(gulp.dest('./asset/scripts/vendors'))
      .pipe(browserSync.stream());
  })

  // Compile Vendors
  gulp.task('compile-vendors', function() {
    gulp.src('./resource/js/vendors/**/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('./asset/scripts/vendors'))
      .pipe(browserSync.stream());
  });

  // Move images
  gulp.task('move-images', function() {
    gulp.src(['./resource/images/**/*.jpg', './resource/images/**/*.png'])
      .pipe(plumber())
      .pipe(gulp.dest('./asset/img'))
      .pipe(browserSync.stream());
  });

  // Move fonts
  gulp.task('move-fonts', function() {
    gulp.src('./resource/fonts/**/*.ttf')
      .pipe(plumber())
      .pipe(gulp.dest('./asset/fonts'))
      .pipe(browserSync.stream());
  });

  // Move .php
  gulp.task('move-php', function() {
    gulp.src('./resource/*.php')
      .pipe(plumber())
      .pipe(gulp.dest('./asset/'))
  });

  // Static Server + Watching SCSS/HTML files
  gulp.task('serve', ['compile-sass', 'compile-js', 'move-vendors', 'move-images', 'move-fonts', 'move-php'], function(){

    browserSync.init({
      index: "./app",
      host: "localhost",
      proxy: "localhost",
      port: 8080,
      open: "external"
    });

    gulp.watch('./resource/scss/**/*.scss', ['compile-sass']);
    gulp.watch('./resource/js/**/*.js', ['compile-js']);
    gulp.watch('./resource/js/vendors/**/*.js', ['move-vendors']);
    gulp.watch('./resource/*.php', ['move-php']);
    gulp.watch(['./resource/images/**/*.jpg', './resource/images/**/*.png'], ['move-images']);
    gulp.watch('./resource/*.php').on('change', browserSync.reload);

  });

//----------------------------------------
//    Default Task
//----------------------------------------

gulp.task('default', ['serve']);
