const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const merge = require('webpack-merge');

const productionConfig = require('./config/webpack.production');
const developmentConfig = require('./config/webpack.development');
const parts = require('./config/webpack.parts');
const PATHS = require('./config/webpack.paths');

const commonConfig = merge([
	// Entries have to resolve to files! They rely on Node
	// convention by default so if a directory contains *index.js*,
	// it resolves to that.
	{
		entry: {
			app: PATHS.app
		},
		output: {
			path: PATHS.build,
			filename: "[name].js"
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack seed'
			})
		]
	},
  parts.loadJavaScript({include: PATHS.app, exclude: /(node_modules|bower_components)/, options: { presets: ['env']}}),
  parts.loadHTML({include: PATHS.app, options: { name: '[name].[ext]'}}),
	parts.lintJavascript({ include: PATHS.app, options: { emitWarning: true} }),
	parts.loadFonts({
		options: {
			name: '[name].[ext]'
		}
	}),
	parts.loadLess({ include: PATHS.app }),

]);

module.exports = env => {
	process.env.BABEL_ENV = env;

	if (env === 'production') {
		return merge(commonConfig, productionConfig);
	}
	return merge(commonConfig, developmentConfig);
};
