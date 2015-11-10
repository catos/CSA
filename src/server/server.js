(function () {
    'use strict';

    var express = require('express');
	var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
	var app = express();

	/**
	 * Config
	 */
	var config = require('./config/config.js')[env];

	require('./config/express')(app, config);

	require('./config/mongoose')(config);

	require('./config/passport')();

	require('./config/routes')(app, config);

	require('./config/errors')(app);

	/**
	 * Initialization
	 */
	require('./api/users/users.seed.js')();

	/**
	 * Start server
	 */
	app.listen(config.port);

	console.log('Listening on port ' + config.port);
	console.log('\tenv = ' + env + '\n\t__dirname = ' + __dirname + '\n\tprocess.cwd = ' + process.cwd());
	console.log('_o\\   \\o|   |o|   |o/   /o_');

} ());