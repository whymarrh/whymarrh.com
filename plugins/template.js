var async = require('async');
var handlebars = require('consolidate').handlebars;
var _ = require('lodash');

var isHtml = RegExp.prototype.test.bind(/\.html$/);

module.exports = function template(opts) {
	return function (files, metalsmith, done) {
		var teplateFile = function teplateFile(file, done) {
			var data = files[file];

			if (!isHtml(file) || !data.wasMarkdown) {
				return done();
			}

			var options = _.assign({}, metalsmith.metadata(), data);
			handlebars(
				// Template name
				metalsmith.path('templates', ~file.indexOf('talks') ? 'slides.html' : 'article.html'),
				// Options
				options,
				// Callback
				(function (data, file, err, str) {
					if (err) {
						return done(err);
					}
					data.contents = new Buffer(str);
					files[file] = data;
					done();
				}).bind(this, data, file)
			);
		};
		async.each(Object.keys(files), teplateFile, done);
	};
};
