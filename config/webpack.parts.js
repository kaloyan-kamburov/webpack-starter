const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // defaults to localhost
    port: process.env.PORT,  // defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.loadHTML = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: [{
          loader: 'html-loader',
          options
        }]
      }
    ]
  }
})

exports.lintJavascript = ({inluced, exluce, options}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options
        }]

      }
    ]
  }
});

exports.loadJavaScript = ({include, exclude, options}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: [{
          loader: 'babel-loader',
          options
        }]
      },
    ],
  },
})

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {

        // For Angular2 https://www.npmjs.com/package/css-to-string-loader
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            // Config classnames
            localIdentName: '[local]__[hash:base64:5]'
          }
        }]
      }
    ]
  }
});

exports.extractCSS = ({include, exclude, use}) => {
  // Output extracted css to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader',
          })
        }
      ]
    },
    plugins: [plugin]
  }
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')()
    ])
  }
});

exports.purifyCSS = ({paths}) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      purifyOptions: {
        whitelist: ['*purify']
      }
    })
  ]
})

exports.loadImages = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: [{
          loader: 'file-loader',
          options
        }]
      }
    ]
  }
})

exports.loadFonts = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts/',
            outputPath: 'fonts/'
          }
        }]
      },
    ],
  },
});

exports.loadLess = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        test: /.*\.less$/,
        include,
        exclude,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      }
    ]
  }
})
