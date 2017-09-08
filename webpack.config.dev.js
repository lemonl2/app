const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, optimize } = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const cssLoaderOption = {
  root: path.resolve(__dirname, 'src/assets'),
  importLoaders: 1,
  sourceMap: true,
}

module.exports = {
  entry: {
    thirdCss: [
      'bootstrap/dist/css/bootstrap-theme.css',
      'bootstrap/dist/css/bootstrap.css',
      'angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
      'font-awesome/css/font-awesome.css',
      'angular-loading-bar/build/loading-bar.css',
    ],
    thirdJs: [
      'angular',
      'angular-animate',
      'angular-i18n/zh-cn',
      '@uirouter/angularjs',
      'angular-ui-bootstrap',
      'angular-deferred-bootstrap',
      'angular-loading-bar',
      'lodash',
      'blueimp-md5',
      'moment',
    ],
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src'),
      App: path.resolve(__dirname, 'src/app'),
      Images: path.resolve(__dirname, 'src/assets/images'),
      Fonts: path.resolve(__dirname, 'src/assets/fonts'),
      Constant: path.resolve(__dirname, 'src/constant'),
      Helpers: path.resolve(__dirname, 'src/helpers'),
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [{
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'file-loader',
          use: [{
            loader: 'css-loader',
            options: cssLoaderOption
          }]
        })
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'file-loader',
          use: [{
              loader: 'css-loader',
              options: cssLoaderOption
            },
            'postcss-loader?sourcemap',
            'sass-loader?sourcemap'
          ]
        })
      }, {
        test(p) {
          return !p.endsWith('fontawesome-webfont.svg') &&
            !p.endsWith('glyphicons-halflings-regular.svg') &&
            /\.(jpg|png|svg|gif)$/.test(p);
        },
        loader: 'file-loader?name=images/[name].[ext]'
      }, {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(ttf|eot|woff2?)|(fontawesome-webfont|glyphicons-halflings-regular)\..*(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8899,
    historyApiFallback: {
      disabledDotRule: true
    },
    proxy: {
      '/api/spl': {
        target: 'http://192.168.31.135:8899',
        logLevel: 'debug',
        pathRewrite: {
          '^/api/spl': ''
        },
        onProxyRes(proxyRes) {
          proxyRes.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        }
      },
    }
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new WebpackNotifierPlugin({
      title: '前端框架'
    }),
    new optimize.CommonsChunkPlugin({
      name: ['thirdCss', 'thirdJs', 'manifest'],
      minChunks: Infinity,
    })
  ]
}
