// 在package.json中需要通过browser定义类库/框架的别名对应的文件路径，否则打包会出错
var $ = require('jquery');
var sum = function (a, b) {
	console.log($);
	console.log(a + b);
};

module.exports = sum;