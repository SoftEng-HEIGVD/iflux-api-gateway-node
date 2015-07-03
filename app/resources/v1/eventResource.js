var
	_ = require('underscore'),
	express = require('express'),
  router = express.Router(),
	kafkaService = require('../../services/kafkaService'),
	resourceService = require('../../services/resourceServiceFactory')('/v1/events');

module.exports = function (app) {
  app.use(resourceService.basePath, router);
};

router.route('/')
	/**
	 * POST /events is invoked by clients to notify that a list of events have occurred.
	 * The body of the request is a list of events. Every event has a timestamp, a type,
	 * a source and a list of properties
	 *
	 * @see {@link http://www.iflux.io/api/reference/#events|REST API Specification}
	 */
	.post(function(req, res) {
  	var events = req.body;

		console.log('%s event(s) received', (_.isArray(events) ? events.length : 1));

		kafkaService.forwardEvents(events);

		resourceService.noContent(res).end();
	});
