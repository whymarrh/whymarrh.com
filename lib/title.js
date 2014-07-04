isMarkdown = RegExp.prototype.test.bind(/(?:\.md)|(?:\.markdown)$/)

module.exports = function (files, metalsmith, done) {
	Object.keys(files).forEach(function (file) {
		if (!isMarkdown(file)) {
			return
		}
		data = files[file]
		markdown = data.contents.toString()
		markdown = markdown.replace(
			// Matches both H1 formats:
			//
			//     # This format #
			//
			// OR
			//
			//     This format
			//     ===========
			//
			// Only matches the first occurence of either.
			/(?:(?:^|\n)\s*\#\s*([^\n]+?)\s*\#?\s*(?:\n+|$))|(?:(?:^|\n)([^\n]+?)\n[=]{3,}(?:\n+|$))/,
			function (match, a, b, offset, str) {
				// 1st or 2nd group
				data.title = a || b
				return '\n'
			}
		)
		data.contents = new Buffer(markdown)
		files[file] = data
	})
	done()
}
