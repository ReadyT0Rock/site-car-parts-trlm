const {src, dest, series, watch} = require('gulp');
const less         = require('gulp-less'); /* из less в css */
const csso         = require('gulp-csso'); /* минификация css файла */
const htmlmin      = require('gulp-htmlmin'); /* минификация html */
const plumber      = require('gulp-plumber'); /* обработка ошибок */
const sync         = require('browser-sync').create(); /* автоперезагрузка страницы */
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); /* расставляет префиксы в стили */
const rename       = require('gulp-rename'); /* ренейм файлов */
const del          = require('del'); /* чистит папку */
const uglify       = require('gulp-uglify-es').default; /* минификация js */
const concat       = require('gulp-concat'); /* ренейм файлов */
const sourcemap    = require('gulp-sourcemaps'); /* отслеживание препроцессорных файлов в браузере */
const squoosh      = require('gulp-libsquoosh'); /* оптимизация растровой графики */
const svgo         = require('gulp-svgmin'); /* оптимизация векторной графики */

function styles () {
  return src('source/less/style.less')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write())
  .pipe(dest('dist/css'))
};

function html () {
  return src('source/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest('dist'))
};

function scripts () {
  return src('source/js/script.js')
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
};

function images () {
  return src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(dest('dist/img'))
};

function svg () {
  return src(['source/img/**/*.svg', '!source/img/sprite.svg'])
  .pipe(svgo())
  .pipe(dest('dist/img'))
};

function copySprite () {
  return src('source/img/sprite.svg')
  .pipe(dest('dist/img'))
};

function copyImages () {
  return src('source/img/**/*.{jpg,png}')
  .pipe(dest('dist/img'))
};

function copySvg () {
  return src('source/img/**/*.svg')
  .pipe(dest('dist/img'))
};

function copy () {
  return src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest'
  ], {
    base: 'source'
  })
  .pipe(dest('dist'));
};

function clean () {
  return del('dist');
};

function server () {
  sync.init({
    server: {
      baseDir: './dist',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  watch('source/*.html', series(html)).on('change', sync.reload);
  watch('source/less/**/*.less', series(styles)).on('change', sync.reload);
  watch('source/js/**/*', series(scripts)).on('change', sync.reload);
};

exports.default = series(clean, copyImages, copySvg, copy, styles, html, scripts, server);
exports.build = series(clean, images, svg, copySprite, copy, styles, html, scripts, server);
