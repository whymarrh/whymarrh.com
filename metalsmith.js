const autoprefixer = require("autoprefixer");
const cleanCss = require("metalsmith-clean-css");
const htmlMinifier = require("metalsmith-html-minifier");
const markdown = require("metalsmith-markdownit");
const Metalsmith = require("metalsmith");
const nopt = require("nopt");
const template = require("./plugins/template");
const title = require("./plugins/title");
const watch = require("metalsmith-watch");

const options = nopt({
	'watch': Boolean,
	'quiet': Boolean,
});

process.on("SIGINT", function () {
	console.log("");
	process.exit(0);
});

Metalsmith(__dirname)
	.use(function (files, _, done) {
		const names = Object.keys(files);
		names.forEach(function (name) {
			if (~name.indexOf('README'))
				delete files[name];
		});
		done();
	})
	.use(title())
	.use(markdown({
		html: true,
		typographer: true
	}))
	.use(template())
	.use(function (files, metalsmith, done) {
		const isCss = RegExp.prototype.test.bind(/\.css$/);
		Object.keys(files).forEach(function (file) {
			if (!isCss(file)) {
				return;
			}
			const data = files[file];
			data.contents = new Buffer(autoprefixer.process(data.contents.toString()).css);
		});
		done();
	})
	.use(cleanCss())
	.use(htmlMinifier())
	.use(options.watch && watch(options.quiet && {
		log: function () {}
	}))
	.build(function (err) {
		err && console.log(err)
	});
