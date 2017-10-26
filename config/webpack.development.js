const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const developmentConfig = merge([
	parts.devServer({
		// Customize host/port if needed
		host: process.env.HOST,
		port: process.env.PORT
	}),
	parts.loadCSS(), 
	parts.loadImages(),
]);

module.exports = developmentConfig;