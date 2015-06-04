var
	_ = require('underscore'),
	s = require('underscore.string');

module.exports = function(basePath) {
	return {
		basePath: s.rtrim(basePath, '/'),

		ok: function(res, obj) {
			return res.status(200).json(obj);
		},

		serverError: function(res, err) {
			return res.status(500).json(err);
		}
	}
};