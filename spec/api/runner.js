require('dotenv').config({ path: '../../.env' });

var
	_ = require('underscore'),
	s = require('underscore.string'),
	Promise = require('bluebird'),
	colors = require('colors'),
	config = require('../../config/config');

require('../../app.js');

var specs = require('require-directory')(module, './v1');

function del(table) {
	return function() {
		return knex(table).del();
	};
}

var
	deferred = Promise.defer(),
	promise = deferred.promise,
	counters = {
		expectations: 0,
		failed: 0,
		tests: 0,
		failedTests: 0
	};

_.each(specs, function(spec, specName) {
	if (s.endsWith(specName, '.spec') && (process.env.RUN_SPEC === undefined || (process.env.RUN_SPEC && s.startsWith(specName, process.env.RUN_SPEC)))) {
		promise = spec.run(promise, { counters: counters });
	}
});

promise = promise.then(function() {
	console.log('\n\nResults: ' + '%s'.red + ' / ' + '%s'.green + ' tests, ' + '%s'.red + ' / ' + '%s'.green + ' expectations.',
		counters.failedTests, counters.tests, counters.failed, counters.expectations);
});

promise.finally(function() {
	process.exit();
});

deferred.resolve();