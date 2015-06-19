'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    debug = require('gulp-debug'),
    webserver = require('gulp-webserver'),
    eventStream = require('event-stream'),
    htmlToDataURI = require('../');


var server = {
  dev: {
    port: 8001
  }
}

var distDir = './dist/';

/*
 * Dist
 *
 */

gulp.task('build', [], function () {
  console.log('Running build..');
  gulp.src('link.html')
      .pipe(htmlToDataURI())
      .pipe(dataURItoFileExample())
      .pipe(gulp.dest(distDir));
});

function dataURItoFileExample(opts) {
  // you're going to receive Vinyl files as chunks
  opts = opts || {};
  opts.link = opts.link || {innerHTML: 'Here is your data URI link'};
  opts.pre = opts.pre || true;
  function transform(file, cb) {
    // read and modify file contents
    var contents = '<html><head></head><body><a href="'
        + String(file.contents) + '">' + opts.link.innerHTML + '</a>';
    if (opts.pre) {
      contents = contents + '<pre style="word-wrap: break-word;">' + String(file.contents) + '</pre>';
    }
    contents = contents + '</body></html>';
    file.contents = new Buffer(String(contents));

    // if there was some error, just pass as the first parameter here
    cb(null, file);
  }

  // returning the map will cause your transform function to be called
  // for each one of the chunks (files) you receive. And when this stream
  // receives a 'end' signal, it will end as well.
  //
  // Additionally, you want to require the `event-stream` somewhere else.
  return eventStream.map(transform);
}
/*
 * Dev
 *
 */

gulp.task('watch', function () {
  //html
  gulp.watch(['./link.html'], ['build']).on('change', function (event) {
    console.log('gulpfile.js ' + event.path + ' was ' + event.type);
  })
});

gulp.task('webserver:dev', ['build', 'watch'], function () {
  gulp.src(['./'])
      .pipe(webserver({
        host: '0.0.0.0',
        port: server.dev.port,
        livereload: true,
        directoryListing: false,
        open: 'http://localhost:' + server.dev.port + '/dist/link.html'
      }));
});

//Assume default is just a build
gulp.task('default', ['build'], function () {
  console.log('Running default..');
});
