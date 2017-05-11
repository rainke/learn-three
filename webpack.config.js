var path = require('path');
var webpack = require('webpack');

var openBrowser = require('react-dev-utils/openBrowser');

var DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9000;

function OpenBrowserPlugin() {
  var defaultOptions = {
    port: DEFAULT_PORT
  };

  this.options = {
    port: defaultOptions.port
  };
  this.firstRun = true;
}

OpenBrowserPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', () => {
    if(this.firstRun) {
      this.firstRun = false;
      openBrowser('http://localhost:' + this.options.port);
    }
  });
};

module.exports = {

  entry:[
    'webpack-dev-server/client?http://localhost:9000',
    'babel-polyfill',
    './index.js'
  ],

  context: path.resolve(__dirname, 'src'),

  output: {
    filename:'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.json'],
    alias:{}
  },

  devServer:{
    hot: true,
    port: 9000,
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules:[
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: true,
        },
      }
    ]
  },

  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"', PUBLIC_URL: '""' } }),
    new OpenBrowserPlugin(),
  ]

};