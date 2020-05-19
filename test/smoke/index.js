const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')
process.chdir(path.join(__dirname, 'template'))
const mocha = new Mocha({
  timeout: '1000ms'
})
rimraf('./dist', () => {
  const prodConfig = require("../../lib/webpack.prod.js")
  webpack(prodConfig, (err, stats) => {
    if (err) {
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: true,
      children: false
    }))
    console.log('开始测试用例')
    mocha.addFile(path.join(__dirname, './html-test.js'))
    mocha.addFile(path.join(__dirname, './css-js-test.js'))
    mocha.run()
  })
})