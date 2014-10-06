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
	'build': Boolean
})

Metalsmith(__dirname)
	.source('source')
	.use(ignore([
		'drafts/**',
		'vendor/**'
	]))
	.use(title())
	.use(markdown())
	.use(template())
	.use(cleanCSS())
	.use(htmlMinifier())
	.use(!options.build && watch())
	.build(function (err) {
		err && console.log(err)
	})
