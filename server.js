var mongoose = require('mongoose');
var app = require('./config/express')();
var config = require('./config/config');

if (process.env.NODE_ENV === 'dev') {
	// ONLY ON DEV ENV
	var morgan = require('morgan');
	var uglify = require('uglify-js');
	var fs = require('fs');

	// logger
	app.use(morgan('dev'));

	// minify js files
	var uglified = uglify.minify([
		'./public/js/core/application.js',
		'./public/js/core/application-config.js',
		'./public/js/core/application-run.js',
		'./public/js/directives/media/media-image-directive.js',
		'./public/js/directives/navbar/navbar-directive.js',
		'./public/js/services/navigation-services.js',
		'./public/js/services/route-resolver-services.js',
		'./public/js/services/global-services.js',
		'./public/js/services/youtube-services.js',
		'./public/js/services/soundcloud-services.js',
		'./public/js/services/data-services.js',
		'./public/js/controllers/global-controller.js',
		'./public/js/controllers/home-controller.js',
		'./public/js/controllers/news-controller.js',
		'./public/js/controllers/news-details-controller.js',
		'./public/js/controllers/videos-controller.js',
		'./public/js/controllers/videos-details-controller.js'
	], {
		mangle: true,
		compress: {
			//sequences: true,
			//dead_code: true,
			//conditionals: true,
			//booleans: true,
			//unused: true,
			//if_return: true,
			//join_vars: true,
			//drop_console: true
		},
		outSourceMap: "app.min.js.map"
	});

	fs.writeFileSync('./public/js/app.min.js', uglified.code);
}

/**
 * Connect to mongolab
 */
mongoose.connect(config.server.db);

/**
 *
 */
app.listen(config.server.port, function (err) {
	if (err) throw err;

	console.info('Application running at port: ' + config.server.port);
});