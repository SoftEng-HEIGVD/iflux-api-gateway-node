var
	_ = require('underscore'),
	npmlog = require('npmlog'),
	config = require('../../config/config'),
	kafka = require('kafka-node'),
	Producer = kafka.Producer,
	KeyedMessage = kafka.KeyedMessage;

var client, producer;

if (config.kafka.enable) {
	client = kafka.Client(config.kafka.connectionString, config.kafka.clientId);
	producer = new Producer(client);
}


module.exports = {
	forwardEvents: function(events) {
		if (config.kafka.enable) {
			var payloadEvents = _.reduce((_.isArray(events) ? events : [ events ]), function (memo, event) {
				memo.push({
					topic: config.kafka.eventTopic,
					messages: JSON.stringify(event)
				});

				return memo;
			}, []);

			producer.send(payloadEvents, function(err, data) {
				if (err) {
					npmlog.warn(err);
				}
			});
		}
	}
};