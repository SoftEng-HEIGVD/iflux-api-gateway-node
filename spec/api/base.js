var
	_ = require('underscore'),
	testFactory = require('./test'),
	config = require('../../config/config');

module.exports = function(name) {
	var test = testFactory(name);

	test
		.baseUrl('http://' + config.host + ':' + config.port)
		.setJson();

	return test;
};