const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProvidePlugin, HashedModuleIdsPlugin, optimize } = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const iltorbCompress = require('iltorb').compress;
const getRepoInfo = require('git-repo-info');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const repoInfo = getRepoInfo();

const cssLoaderOption = {
  root: path.resolve(__dirname, 'src/assets'),
  importLoaders: 1,
  minimize: true,
  sourceMap: false
};

module.exports = {
  entry: {
    thirdCss: [
      'angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
      'font-awesome/scss/font-awesome.scss',
      'angular-gridster/dist/angular-gridster.css',
      'angular-loading-bar/build/loading-bar.css',
      'angular-resizable/src/angular-resizable.css',
    ],
    thirdJs: [
      'babel-polyfill',
      'dom4',
      'angular',
      'angular-animate',
      'angular-i18n/zh-cn',
      '@uirouter/angularjs',
      'angular-ui-bootstrap',
      'angular-deferred-bootstrap',
      'angular-gridster',
      'angular-resizable',
      'echarts',
      'd3',
      'moment',
      'ng-file-upload',
      'angular-ui-ace',
      'brace',
      'brace/mode/json',
      'angular-loading-bar',
      'lodash',
      'blueimp-md5',
      'binary-search',
    ],
    templates: glob.sync('./src/*/**/*.html'),
    bundle: './src/index.js',
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
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'happypack/loader?id=html',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=css'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=css', 'happypack/loader?id=sass'],
        })
      },
      {
        test: /(\.(ttf|eot|woff2?)|fontawesome-webfont\..*|glyphicons-halflings-regular..*)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test(p) {
          return !p.endsWith('fontawesome-webfont.svg')
              && !p.endsWith('glyphicons-halflings-regular.svg')
              && /\.(jpg|png|svg|gif|webp)$/.test(p);
        },
        loader: 'url-loader?limit=100000&name=images/[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=js',
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new DefinePlugin({
      __SHARPLOOK_COMMIT_SHA__: JSON.stringify(repoInfo.sha),
      __SHARPLOOK_VERSION__: JSON.stringify(repoInfo.tag),
      __SHARPLOOK_ENVIRONMENT__: JSON.stringify('prod'),
      __SHARPLOOK_COMPILE_TIME__: JSON.stringify(Date.now()),
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      echarts: 'echarts',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true,
    }),
    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
        }
      }
    }),
    new optimize.CommonsChunkPlugin({
      name: ['thirdCss', 'thirdJs', 'templates', 'manifest'],
      minChunks: Infinity,
    }),
    new optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].br[query]',
      algorithm: iltorbCompress,
      test: /\.(js|html|css|svg|ttf)$/,
      threshold: 10240,
    }),
    new CompressionPlugin({
      algorithm: 'zopfli',
      test: /\.(js|html|css|svg|ttf)$/,
      threshold: 10240,
    }),
    new HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new HappyPack({
      id: 'html',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'html-loader',
        query: {
          minimize: true
        }
      }]
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          plugins: ['transform-runtime', 'transform-object-rest-spread'],
          presets: [ ['latest', { 'loose': true }] ]
        }
      }]
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'css-loader',
        options: cssLoaderOption
      }, 'postcss-loader']
    }),
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: ['sass-loader']
    })
  ]
};
