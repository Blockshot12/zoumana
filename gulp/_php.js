'use strict';

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Update php files task.
 */
let buildPhp = () => {
  return gulp.src(conf.paths.twigs.src)
    .pipe($.notify({
      title: 'Php task completed',
      message: 'All php files are saved.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/php.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('php', () => {
  return buildPhp();
});

gulp.task('twigs-reload', () => {
  return buildPhp()
    .pipe(browserSync.stream());
});
