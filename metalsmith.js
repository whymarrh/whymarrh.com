Metalsmith = require('metalsmith')
  markdown = require('metalsmith-markdown')
 templates = require('metalsmith-templates')

// 1. Set the source directory to be src/
// 2. Render any mardown files to HTML
// 3. Render files into a template file
// 4. Output files to the build/ directory
// 5. Log any and all errors

Metalsmith(__dirname)
	.source('./src')
	.use(markdown())
	.use(templates('handlebars'))
	.destination('./build')
	.build(function (err) {
		err && console.log(err)
	})
