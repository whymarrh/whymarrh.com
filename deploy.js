var Promise = require("bluebird");
var AWS = require("aws-sdk");

var s3 = new AWS.S3();
var cloudFront = new AWS.CloudFront();
var domain = "whymarrh.com";

var createCfInvalidation = function createCfInvalidation(paths) {
	return Promise.promisify(cloudFront.listDistributions, cloudFront)({
		// Defaults
	})
	.then(function (list) {
		return (list.Items || []).filter(_ => _.Aliases.Items[0] === domain).map(_ => _.Id).pop();
	})
	.then(function (id) {
		return Promise.promisify(cloudFront.createInvalidation, cloudFront)({
			DistributionId: id,
			InvalidationBatch: {
				CallerReference: (new Date() * 1).toString(),
				Paths: {
					Quantity: paths.length,
					Items: paths.map(o => '/' + o)
				}
			}
		});
	});
};

Promise.promisify(s3.listObjects, s3)({
	Bucket: domain
})
.then(function (data) {
	return data.Contents.map(_ => _.Key);
})
.then(function (keys) {
	return createCfInvalidation(keys);
})
.caught(function (err) {
	console.error(err.stack);
	process.exit(1);
});
