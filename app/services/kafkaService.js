var
	_ = require('underscore'),
	config = require('../../config/config'),
	kafka = require('kafka-node'),
	Producer = kafka.Producer,
	KeyedMessage = kafka.KeyedMessage;

var client, producer;

if (config.kafka.enable) {
	client = kafka.Client(config.kafka.connectionString, config.kafka.clientId);
	producer = new Producer(client);

	producer.on('error', function(error) {
		console.log(error.message);
	})
}

module.exports = {
	forwardEvents: function(events) {
		if (config.kafka.enable) {
			var payloadEvents = _.reduce((_.isArray(events) ? events : [ events ]), function (memo, event) {
				memo.push(JSON.stringify(event));
				return memo;
			}, []);

			producer.send([{ topic: config.kafka.eventTopic, messages: payloadEvents }], function(err, data) {
				if (err) {
					console.log(err.message);
				}
			});
		}
	}
};