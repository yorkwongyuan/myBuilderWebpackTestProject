const assert = require('assert')
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry/index', () => {
    assert.equal(baseConfig.entry.index, '/Users/wangy/IT/webpack/webpack-jike/builder-webpack/test/smoke/template/src/index/index.js')
  })
  it('entry/search', () => {
    assert.equal(baseConfig.entry.search, '/Users/wangy/IT/webpack/webpack-jike/builder-webpack/test/smoke/template/src/search/index.js')
  })

})