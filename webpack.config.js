const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWepbackPlugin = require('clean-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const path = require('path');

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

			//new UglifyJsPlugin(),
			new HtmlWebpackPlugin({
        template: 'app/composed.hbs',
				title: 'Webpack seed'
			}),
      new CleanWepbackPlugin(['build']),
      new HandlebarsPlugin({
        // path to hbs entry file(s)
        entry: path.join(PATHS.app, "*.hbs"),
        // output path and filename(s)
        // if ommited, the input filepath stripped of its extension will be used
        output: path.join(PATHS.build, "[name].html"),
        partials: [
          path.join(PATHS.app, "partials", "*.hbs")
        ],
        // hooks
        onBeforeSetup: function (Handlebars) {},
        onBeforeAddPartials: function (Handlebars, partialsMap) {},
        onBeforeCompile: function (Handlebars, templateContent) {},
        onBeforeRender: function (Handlebars, data) {},
        onBeforeSave: function (Handlebars, resultHtml, filename) {},
        onDone: function (Handlebars, filename) {}
      })
		]
	},
  parts.loadJavaScript({include: PATHS.app, exclude: /(node_modules|bower_components)/, options: { presets: ['env']}}),
  parts.loadHTML({include: PATHS.app, options: { name: '[name].[ext]'}}),
	parts.lintJavascript({ include: PATHS.app, options: { emitWarning: true} }),
	parts.loadFonts({ include: PATHS.app }),
	parts.loadLess({ include: PATHS.app })
]);

module.exports = env => {
	process.env.BABEL_ENV = env;

	if (env === 'production') {
		return merge(commonConfig, productionConfig);
	}
	return merge(commonConfig, developmentConfig);
};
