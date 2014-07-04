  markdown = require('metalsmith-markdown')
Metalsmith = require('metalsmith')

     title = require('./lib/title')
  template = require('./lib/template')

Metalsmith(__dirname)
	.source('./src')
	.use(title)
	.use(markdown())
	.use(template)
	.destination('./build')
	.build(function (err) {
		err && console.log(err)
	})
