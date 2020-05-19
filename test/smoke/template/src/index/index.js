
import React from 'react'
import ReactDOM from 'react-dom'
import logo from '../../static/A.jpeg'
// // import common from '../../common/index'
import { a } from './tree-shaking';

require('./index.scss')

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null,
    }
  }

  loadComponent () {
    import('./text.js').then((Text) => {
      console.log(Text.default, 'default')
      this.setState({
        Text: Text.default,
      })
    })
  }

  render () {
    const k = 123
    // 测试tree-shaking
    if (k) {
      const funca = a()
      console.log(funca, 'hei')
    }
    const { Text } = this.state
    console.log(Text, 'text')
    return (
      <>
        <button className="search-text" onClick={this.loadComponent.bind(this)}>动态加载</button>
        <div>
          {Text ? <Text /> : '没'}
        </div>
        图片部分
        <img src={logo} alt="" />
      </>
    )
  }
}

ReactDOM.render(<Search />, document.getElementById('root'))
