module.exports = function (process) {
	process.on('SIGINT', function () {
		console.log('')
		process.exit(0)
	})
}
