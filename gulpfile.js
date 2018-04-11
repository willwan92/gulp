/**
 * gulpfile
 * @authors Your Name (you@example.org)
 * @date    2018-04-11 16:48:14
 * @version $Id$
 */

var gulp = require('gulp');
var browserify = require('browserify');
var fs = require('fs');

// 可以通过任务名调用任务
var sequence = require('run-sequence');

// 监控文件变化，并且可以监控依赖文件的变化
var watchify = require('watchify');


// 定义默认任务
gulp.task('default', function () {
	sequence('scripts');
});

// 打包js
gulp.task('scripts', function () {
	// browserify api
	// browserify()
	// 	.add(['src/js/b.js', 'src/js/sum.js'])
	// 	.bundle()
	// 	.pipe(fs.createWriteStream('js/bundle.js'));
		
	var b = browserify({
		entries: 'src/js/index.js',
		cache: {},
		packageCache: {},
		plugin: [watchify]
	});

	var bundle = function () {
		b.bundle().pipe(fs.createWriteStream('js/app.js'));
	};

	bundle();

	b.on('update', bundle);


});

// 监控文件变化
// gulp.task('watch', function () {
// 	gulp.watch(['src/js/*.js'], function () {
// 		sequence('scripts');
// 	});
	
// });