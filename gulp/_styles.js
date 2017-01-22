'use strict';

import path from 'path';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Compile the SASS files into CSS.
 */
let buildStyles = () => {
  let onError = function(error) {
    $.notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(conf.paths.styles.src)
    .pipe($.sassGlob())
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      includePaths: [
      ]
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(conf.paths.styles.dist))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe($.sourcemaps.write('./', { debug: true }))
    .pipe(gulp.dest(conf.paths.styles.dist))
    .pipe($.notify({
      title: 'Sass task completed',
      message: 'All Sass files are compiled into CSS and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 1000,
      onLast: true
    }));
};
