function buildConfig(env = 'dev') {
  return require('./webpack.config.' + env + '.js');
}

module.exports = buildConfig;
