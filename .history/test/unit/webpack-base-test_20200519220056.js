const assert = require('assert')
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry/index', () => {
    assert.equal(baseConfig.entry.index.indexOf('test/smoke/template/src/index/index.js') > -1, true)
  })
  it('entry/search', () => {
    assert.equal(baseConfig.entry.search.indexOf('test/smoke/template/src/search/index.js'), true)
  })

})