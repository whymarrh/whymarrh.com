    cleanCSS = require('metalsmith-clean-css')
htmlMinifier = require('metalsmith-html-minifier')
      ignore = require('metalsmith-ignore')
    markdown = require('metalsmith-markdown')
  Metalsmith = require('metalsmith')
       watch = require('metalsmith-watch')
        nopt = require('nopt')

    sigint = require('./plugins/sigint')(process)
     title = require('./plugins/title')
  template = require('./plugins/template')

options = nopt({
	'watch': Boolean
})

Metalsmith(__dirname)
	.use(ignore([
		'drafts/**',
		'vendor/**'
	]))
	.use(title())
	.use(markdown())
	.use(template())
	.use(cleanCSS())
	.use(htmlMinifier())
	.use(options.watch && watch())
	.build(function (err) {
		err && console.log(err)
	})
