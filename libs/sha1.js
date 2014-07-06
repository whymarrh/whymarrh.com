   crypto = require('crypto')
minimatch = require('minimatch')
     path = require('path')

module.exports = function (files, metalsmith, done) {
	Object.keys(files).forEach(function (file) {
		if (!minimatch(file, 'articles/*.html')) {
			return
		}
		data = files[file]
		delete files[file]
		hash = crypto.createHash('sha1').update(data.contents).digest('hex')
		filename = file.replace(path.basename(file), hash)
		files[filename] = data
	})
	done()
}
