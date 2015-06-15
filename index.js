'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var chalk = require('chalk');

module.exports = function (opts) {
  var count = 0;
	return through.obj(function (file, enc, cb) {
		gutil.log('The data URI:')
    gutil.log(chalk.green('data:text/html,' + encodeURIComponent(file.contents.toString())));
    count++;
		cb(null, file);
	}, function (cb) {
		gutil.log('Processed ' + chalk.green(count + ' items'));
		cb();
	});
};
