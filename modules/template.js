     async = require('async')
handlebars = require('consolidate').handlebars
         _ = require('lodash')

isHtml = RegExp.prototype.test.bind(/\.html$/)

module.exports = function (files, metalsmith, done) {
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
			template = metalsmith.join('templ', data.template)
			options = _.assign({}, metalsmith.metadata(), data)
			handlebars(
				template,
				options,
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
