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

var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gif = require('gulp-if');

var isProduction = process.env.ENV === 'prod';
// 定义默认任务
gulp.task('default', function () {
	sequence('scripts');
});

// 打包js
gulp.task('scripts', function () {
	// browserify api
	// browserify()
	// 	.add(['src/js/index.js', 'src/js/sum.js'])
	// 	.bundle()
	// 	.pipe(fs.createWriteStream('js/app.js'));
		
	var b = browserify({
		entries: './src/js/index.js',
		cache: {},
		packageCache: {},
		plugin: [watchify]
	});

	var bundle = function () {
		// bundle() 方法返回的是用打包后的js文件内容返回node文件系统标准的可读流
		// 但是gulp使用的是vinyl文件系统的流，所以在使用gulp-uglify时需要用的是
		// vinyl的buffer
		b.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(gif(isProduction, uglify()))
			.pipe(gulp.dest('js/'));
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