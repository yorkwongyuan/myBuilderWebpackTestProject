const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const rootPath = process.cwd()
function setMPA () {
  const entry = {}
  const htmlWebpackPlugin = []
  const files = require('glob').sync(path.join(rootPath, 'src/*/index.js'))
  files.forEach((file) => {
    const pageName = file.match(/\/src\/(.*)\/index.js/)[1];
    entry[pageName] = file
    htmlWebpackPlugin.push(new HtmlWebpackPlugin({
      template: path.join(rootPath, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      inject: true,
      chunks: [pageName],
      minify: {
        html5: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        removeTagWhitespace: true,
        preserveLineBreaks: false,
      },
    }))
  })
  return {
    entry,
    htmlWebpackPlugin,
  }
}
const { entry, htmlWebpackPlugin } = setMPA()
module.exports = {
  entry,
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  stats: 'errors-only',
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => require('autoprefixer')({
              browsers: ['last 8 version', '>1%'],
            }),
          },
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75, // 1rem = 75px
            remPrecision: 8, // 小数点
          },
        },
      ],
    }, {
      test: /\.(jpe?g|png)$/,
      use: [{ loader: 'url-loader', options: { limit: 29000, name: 'image/[emoji][folder].[ext]' } }],
    }, {
      test: /\.(woff|woff2|eot|otf|ttf)$/,
      use: [{ loader: 'url-loader', options: { name: '[name].[ext]' } }],
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin () {
      this.hooks.done.tap('done', (stats) => {
        console.log(stats.compilation.errors, '错误提示') // eslint-disable-line
        if (stats.compilation.errors && stats.compilation.errors.length) {
          process.exit(1)
        }
      })
    },
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugin),
}
