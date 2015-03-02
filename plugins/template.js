     async = require('async')
handlebars = require('consolidate').handlebars
         _ = require('lodash')

isHtml = RegExp.prototype.test.bind(/\.html$/)

module.exports = function template(opts) {
	return function (files, metalsmith, done) {
		keys = Object.keys(files)
		async.each(
			keys,
			function (file, complete) {
				data = files[file]
				if (
					   !isHtml(file)
					|| !data.template
				) {
					return complete()
				}
				options = _.assign({}, metalsmith.metadata(), data)
				handlebars(
					// Template name
					metalsmith.path('templates', data.template),
					// Options
					options,
					// Callback fn
					(function (data, file, err, str) {
						if (err) {
							return complete(err)
						}
						data.contents = new Buffer(str)
						files[file] = data
						complete()
					}).bind(this, data, file)
				)
			},
			done
		)
	}
}