var Promise = require("bluebird");
var AWS = require("aws-sdk");

var s3 = new AWS.S3();
var cloudFront = new AWS.CloudFront();
var domain = "whymarrh.com";

var createCfInvalidation = function createCfInvalidation(distributionId, ...items) {
	return Promise.promisify(cloudFront.createInvalidation, cloudFront)({
		DistributionId: distributionId,
		InvalidationBatch: {
			CallerReference: (new Date() * 1).toString(),
			Paths: {
				Quantity: items.length,
				Items: items
			}
		}
	});
};

Promise.promisify(cloudFront.listDistributions, cloudFront)({ /* Defaults */ })
.then(distributions => distributions.Items.filter(_ => _.Aliases.Items[0] === domain)[0].Id)
.then(id => createCfInvalidation(id, "/*"));
