/**
 * gulpfile
 * @authors Your Name (you@example.org)
 * @date    2018-04-11 16:48:14
 * @version $Id$
 */

var gulp = require('gulp');
var browserify = require('browserify');

gulp.task('default', function () {
	var b = browserify({
		entries: 'js/b.js',
		debug: true
	});

	return b.bundle()
		.pipe();
})
