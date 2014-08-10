    ignore = require('metalsmith-ignore')
  markdown = require('metalsmith-markdown')
Metalsmith = require('metalsmith')
     watch = require('metalsmith-watch')

    sigint = require('./modules/sigint')(process)
     title = require('./modules/title')
  template = require('./modules/template')

Metalsmith(__dirname)
	.use(ignore([
		'drafts/**',
		'vendor/**'
	]))
	.use(title())
	.use(markdown())
	.use(template())
	.use(watch())
	.build(function (err) {
		err && console.log(err)
	})
