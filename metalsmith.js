var autoprefixer = require("autoprefixer");
var cleanCss = require("metalsmith-clean-css");
var htmlMinifier = require("metalsmith-html-minifier");
var markdown = require("metalsmith-markdown");
var Metalsmith = require("metalsmith");
var nopt = require("nopt");
var template = require("./plugins/template");
var title = require("./plugins/title");
var watch = require("metalsmith-watch");

var options = nopt({
	'watch': Boolean
});

process.on("SIGINT", function () {
	console.log("");
	process.exit(0);
});

Metalsmith(__dirname)
	.use(title())
	.use(markdown())
	.use(template())
	.use(function (files, metalsmith, done) {
		var isCss = RegExp.prototype.test.bind(/\.css$/);
		Object.keys(files).forEach(function (file) {
			if (!isCss(file)) {
				return;
			}
			var data = files[file];
			data.contents = new Buffer(autoprefixer.process(data.contents.toString()).css);
		});
		done();
	})
	.use(cleanCss())
	.use(htmlMinifier())
	.use(options.watch && watch())
	.build(function (err) {
		err && console.log(err)
	});
