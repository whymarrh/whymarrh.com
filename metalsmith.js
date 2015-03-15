var cleanCss = require("metalsmith-clean-css");
var htmlMinifier = require("metalsmith-html-minifier");
var ignore = require("metalsmith-ignore");
var markdown = require("metalsmith-markdown");
var Metalsmith = require("metalsmith");
var nopt = require("nopt");
var sigint = require("./plugins/sigint")(process);
var template = require("./plugins/template");
var title = require("./plugins/title");
var watch = require("metalsmith-watch");

var options = nopt({
	'watch': Boolean
});

Metalsmith(__dirname)
	.use(ignore([
		'drafts/**',
		'vendor/**'
	]))
	.use(title())
	.use(markdown())
	.use(template())
	.use(cleanCss())
	.use(htmlMinifier())
	.use(options.watch && watch())
	.build(function (err) {
		err && console.log(err)
	});
