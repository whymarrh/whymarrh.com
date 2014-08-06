    ignore = require('metalsmith-ignore')
  markdown = require('metalsmith-markdown')
Metalsmith = require('metalsmith')
     watch = require('metalsmith-watch')

    sigint = require('./libs/sigint')(process)
     title = require('./libs/title')
  template = require('./libs/template')

Metalsmith(__dirname)
	.source('./src')
	.destination('./build')
	.use(ignore([
		'drafts/**',
		'vendor/**'
	]))
	.use(title)
	.use(markdown())
	.use(template)
	.use(watch())
	.build(function (err) {
		err && console.log(err)
	})
