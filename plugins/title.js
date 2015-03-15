var isMarkdown = RegExp.prototype.test.bind(/(?:\.md)|(?:\.markdown)$/);
// Matches both H1 formats:
//
//     # This format #
//
// OR
//
//     This format
//     ===========
//
// Only matches the first occurence of either
var headerRegExp = /(?:(?:^|\n)\s*\#\s*([^\n]+?)\s*\#?\s*(?:\n+|$))|(?:(?:^|\n)([^\n]+?)\n[=]{3,}(?:\n+|$))/;

module.exports = function title(opts) {
	return function (files, metalsmith, done) {
		Object.keys(files).forEach(function (file) {
			if (!isMarkdown(file)) {
				return;
			}
			var data = files[file];
			data.wasMarkdown = true;
			var results = headerRegExp.exec(data.contents.toString());
			if (results && results.length > 1) {
				data.title = results[1] || results[2];
			}
		});
		done();
	};
};
