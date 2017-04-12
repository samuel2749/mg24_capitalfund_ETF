var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var tinypng = require('gulp-tinypng');
var clean = require('gulp-clean');
var uncss = require('gulp-uncss')

gulp.task('build', ['cleanHtml'], function() {
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task('compass', ['cleanCss'], function(){
  gulp.src('./src/scss/**/*.scss')
      .pipe(compass({
        config_file: './config.rb',
        sourcemap: false,
        time: true,
        css: './dist/css/',
        sass: './src/scss/',
        image: './src/images/',
        style: 'nested' //nested, expanded, compact, compressed
      })).on('error', handleError)
      .pipe(autoprefixer())
      // .pipe(uncss({
      //   html: ['dist/*.html']
      // }))
  		.pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.reload({stream:true}));
});

// gulp.task('sass', function(){
//   gulp.src('scss/*.scss')
//       .pipe(sass()).on('error', handleError)
//       .pipe(autoprefixer())
//       .pipe(minify())
//       .pipe(gulp.dest('../css'))
//       .pipe(browserSync.reload({stream:true}));
// });

gulp.task('uglify', ['cleanJs'], function() {
  gulp.src('./src/js/**/*.js')
      // .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({stream:true}));

  gulp.src('./src/js/**/*.json')
      // .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('tinypng', ['cleanImg'], function () {
    gulp.src('./src/images/**/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest('./dist/images'));

    // gulp.src('./src/images/**/*.{png,jpg}')
    //     .pipe(tinypng('qtV_OqBBXFMv9oVj--iIl7V-Z4GI49Vl'))
    //     .pipe(gulp.dest('./src/imagesNew'));
    // gulp.src('./src/images/**/*.gif')
    //     .pipe(gulp.dest('./src/imagesNew'));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('rebuild', ['build'], function () {
    browserSync.reload();
});

gulp.task('cleanHtml', function () {
  return gulp.src('./dist/*.html', {read: false}).pipe(clean({force: true}));
});
gulp.task('cleanCss', function () {
  return gulp.src('./dist/css/**/*.css', {read: false}).pipe(clean({force: true}));
});
gulp.task('cleanJs', function () {
  return gulp.src('./dist/js/**/*.js', {read: false}).pipe(clean({force: true}));
});
gulp.task('cleanImg', function () {
  return gulp.src('./dist/js/**/*.{png,jpg,gif,ico}', {read: false}).pipe(clean({force: true}));
});



// 手機版
gulp.task('m-build', ['m-cleanHtml'], function() {
  gulp.src('./src/m/*.html')
      .pipe(gulp.dest('./dist/m'));
});

gulp.task('m-compass', ['m-cleanCss'], function(){
  gulp.src('./src/m/scss/**/*.scss')
      .pipe(compass({
        config_file: './config.rb',
        sourcemap: false,
        time: true,
        css: './dist/m/css/',
        sass: './src/m/scss/',
        image: './src/m/images/',
        style: 'nested' //nested, expanded, compact, compressed
      })).on('error', handleError)
      .pipe(autoprefixer())
      // .pipe(uncss({
      //   html: ['dist/*.html']
      // }))
  		.pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.reload({stream:true}));
});

// gulp.task('sass', function(){
//   gulp.src('scss/*.scss')
//       .pipe(sass()).on('error', handleError)
//       .pipe(autoprefixer())
//       .pipe(minify())
//       .pipe(gulp.dest('../css'))
//       .pipe(browserSync.reload({stream:true}));
// });

gulp.task('m-uglify', ['m-cleanJs'], function() {
  gulp.src('./src/m/js/**/*.js')
      // .pipe(uglify())
      .pipe(gulp.dest('./dist/m/js'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('m-tinypng', ['m-cleanImg'], function () {
    gulp.src('./src/m/images/**/*.{png,jpg,gif,ico}')
        // .pipe(tinypng('qtV_OqBBXFMv9oVj--iIl7V-Z4GI49Vl'))
        .pipe(gulp.dest('./dist/m/images'));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('m-rebuild', ['m-build'], function () {
    browserSync.reload();
});

gulp.task('m-cleanHtml', function () {
  return gulp.src('./dist/m/*.html', {read: false}).pipe(clean({force: true}));
});
gulp.task('m-cleanCss', function () {
  return gulp.src('./dist/m/css/**/*.css', {read: false}).pipe(clean({force: true}));
});
gulp.task('m-cleanJs', function () {
  return gulp.src('./dist/m/js/**/*.js', {read: false}).pipe(clean({force: true}));
});
gulp.task('m-cleanImg', function () {
  return gulp.src('./dist/m/js/**/*.{png,jpg,gif,ico}', {read: false}).pipe(clean({force: true}));
});



gulp.task('browser-sync', ['build', 'compass', 'uglify', 'tinypng', 'm-build', 'm-compass', 'm-uglify', 'm-tinypng'], function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('watch', function(){
  gulp.watch(['./src/**/*.html'], ['rebuild']);
  gulp.watch(['./src/scss/**/*.scss'], ['compass']);
  gulp.watch(['./src/js/**/*.js'], ['uglify']);
  gulp.watch(['./src/images/**'], ['tinypng']);
  // gulp.watch(['./src/m/**/*.html'], ['m-rebuild']);
  // gulp.watch(['./src/m/scss/**/*.scss'], ['m-compass']);
  // gulp.watch(['./src/m/js/**/*.js'], ['m-uglify']);
  // gulp.watch(['./src/m/images/**'], ['m-tinypng']);
});

gulp.task('default', ['browser-sync', 'watch']);
