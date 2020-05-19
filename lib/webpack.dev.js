const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    stats: 'errors-only',
    contentBase: './dist',
    hot: true,
  },
  devtool: 'cheap-source-map',
}
module.exports = merge(baseConfig, devConfig)
