var baseTest = require('../base');

module.exports = baseTest('Me resource')
	.describe('Should be possible to send one event')
	.post({
		url: '/v1/events',
		body: {
			timestamp: "2015-01-12T05:21:07Z",
			sourceId: "sourceId",
			typeId: "typeId",
			data: {
				test: "v1"
			}
		}
	})
	.expectStatusCode(204)

	.describe('Should be possible to send multiple events')
	.post({
		url: '/v1/events',
		body: [{
			timestamp: "2015-01-12T05:21:07Z",
			sourceId: "sourceId",
			typeId: "eventSource",
			data: {
				test: "v1"
			}
		}, {
			timestamp: "2015-01-12T05:21:07Z",
			sourceId: "sourceId",
			typeId: "typeId",
			data: {
				test: "v2"
			}
		}]

	})
	.expectStatusCode(204)
;