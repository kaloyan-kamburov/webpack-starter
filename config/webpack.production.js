const merge = require('webpack-merge');
const glob = require('glob');
const parts = require('./webpack.parts');
const PATHS = require('./webpack.paths');

const productionConfig = merge([
	parts.extractCSS({ use: ['css-loader', parts.autoprefix()] }),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: '[name].[ext]'
		}
	})
]);

module.exports = productionConfig;