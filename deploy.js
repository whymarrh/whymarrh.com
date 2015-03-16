var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var cloudFront = new AWS.CloudFront();

var getDistributionId = function getDistributionId(domain, callback) {
	cloudFront.listDistributions(function cb(err, data) {
		if (err) {
			return callback(err);
		}
		var items = data.Items || [];
		var ids = data.Items.filter(function filterDistributionByAlias(item) {
			return item.Aliases.Quantity === 1 && item.Aliases.Items[0] === domain;
		}).map(function mapDistributionsToIds(item) {
			return item.Id;
		});
		callback(undefined, ids.pop());
	});
};

var getCurrentObjects = function getCurrentObjects(bucket, callback) {
	s3.listObjects({
		Bucket: bucket
	}, function cb(err, data) {
		if (err) {
			return callback(err);
		}
		var keys = data.Contents.map(function (item) {
			return item.Key;
		});
		callback(undefined, keys);
	});
};

var invalidateObjects = function invalidateObjects(objects, distributionId, callback) {
	cloudFront.createInvalidation({
		DistributionId: distributionId,
		InvalidationBatch: {
			CallerReference: (new Date() * 1).toString(),
			Paths: {
				Quantity: objects.length,
				Items: objects.map(function prefix(object) {
					return '/' + object;
				})
			}
		}
	}, function cb(err, data) {
		if (err) {
			return callback(err);
		}
		callback(undefined, data);
	});
};

var processError = function processError(err) {
	if (!err) {
		return;
	}
	console.error(err);
	console.error(err.stack);
	process.exit(1);
};

var domain = "whymarrh.com";
getCurrentObjects(domain, function processCurrentObjects(err, keys) {
	processError(err);
	getDistributionId(domain, function invalidateCurrentObjects(err, distributionId) {
		processError(err);
		invalidateObjects(keys, distributionId, function logResult(err, result) {
			processError(err);
			console.log(result);
		});
	});
});
