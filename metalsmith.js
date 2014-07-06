  markdown = require('metalsmith-markdown')
Metalsmith = require('metalsmith')

      sha1 = require('./libs/sha1')
     title = require('./libs/title')
  template = require('./libs/template')

Metalsmith(__dirname)
	.source('./src')
	.use(title)
	.use(markdown())
	.use(template)
	.use(sha1)
	.destination('./build')
	.build(function (err) {
		err && console.log(err)
	})
