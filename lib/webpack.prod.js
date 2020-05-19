const merge = require('webpack-merge')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  stats: 'errors-only',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: false,
        },
      },
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     // minSize: 10000000, 注意这个minSize可以放在catcheGroups里面也可以在外面
  //     cacheGroups: {
  //       venders: {
  //         minSize: 0,
  //         test: /(react|react-dom)/, // 匹配引入的包
  //         name: '大明王朝', // 打包后的名字
  //         chunks: 'all', // 同步和异步都可以
  //       },
  //       commons: {
  //         minChunks: 2,
  //         minSize: 0,
  //         name: 'commons',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
}
module.exports = merge(baseConfig, prodConfig)
