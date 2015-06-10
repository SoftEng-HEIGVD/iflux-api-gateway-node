var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	dotenv = require('dotenv'),
	env = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV != 'docker') {
	dotenv.load();
}

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'iFLUX-API-Gateway'
    },
    port: process.env.PORT || 3006,
	  host: process.env.HOST || 'localhost',
	  kafka: {
		  enable: true,
		  connectionString: process.env.KAFKA_ZOOKEEPER_HOST + ':' + process.env.KAFKA_ZOOKEEPER_PORT,
		  clientId: 'iflux-api-gateway',
		  eventTopic: 'iflux-events'
	  }
  },

  test: {
    root: rootPath,
		app: {
			name: 'iFLUX-API-Gateway',
			debug: process.env.DEBUG || false
    },
    port: process.env.PORT || 3016,
	  host: process.env.HOST || 'localhost',
	  kafka: {
		  enable: false,
		  connectionString: process.env.KAFKA_ZOOKEEPER_HOST + ':' + process.env.KAFKA_ZOOKEEPER_PORT,
		  clientId: 'iflux-api-gateway',
		  eventTopic: 'iflux-events'
	  }
  },

  production: {
    root: rootPath,
    app: {
	    name: 'iFLUX-API-Gateway'
    },
    port: process.env.PORT || 3006,
	  host: process.env.HOST || 'localhost',
	  kafka: {
		  enable: true,
		  connectionString: process.env.KAFKA_ZOOKEEPER_HOST + ':' + process.env.KAFKA_ZOOKEEPER_PORT,
		  clientId: 'iflux-api-gateway',
		  eventTopic: 'iflux-events'
	  }
  },

	docker: {
		root: rootPath,
		app: {
			name: 'iFLUX-API-Gateway'
		},
		port: 3000,
		host: process.env.HOST || 'localhost',
		kafka: {
			enable: true,
			connectionString: process.env.ZK_PORT_2181_TCP_ADDR + ':' + process.env.ZK_PORT_2181_TCP_PORT,
			clientId: 'iflux-api-gateway',
		  eventTopic: 'iflux-events'
	  }
	}
};

module.exports = config[env];
