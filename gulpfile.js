const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/',
  },
  img: {
    src: 'src/img/**',
    dest: 'dist/img',
  },
  html: {
    src: 'src/*.html',
    dest: 'dist',
  },
};

function clean() {
  return del(['dist/*', '!dist/img']);
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function img() {
  return gulp
    .src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.img.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(
      rename({
        basename: 'main',
        suffix: '.min',
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: './dist/',
  });
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.img.src, img);
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch);

exports.clean = clean;
exports.img = img;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
