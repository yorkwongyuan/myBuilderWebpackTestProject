const express = require('express');
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware');
const config = require('./webpack.config')
console.log(config.output.publicPath)
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, function () {
  console.log('服务已经启动!')
})