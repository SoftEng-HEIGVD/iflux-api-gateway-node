var
	_ = require('underscore'),
	s = require('underscore.string');

module.exports = function(basePath) {
	return {
		basePath: s.rtrim(basePath, '/'),

		ok: function(res, obj) {
			return res.status(200).json(obj);
		},

		noContent: function(res) {
			return res.status(204);
		},

		serverError: function(res, err) {
			return res.status(500).json(err);
		}
	}
};