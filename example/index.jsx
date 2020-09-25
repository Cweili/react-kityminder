import { createElement, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import Kityminder from '../src'

function App() {
  const minder = useRef()
  const [value, setValue] = useState({
    root: {
      data: {
        text: '百度产品',
        image: 'https://www.baidu.com/img/bd_logo1.png?where=super',
        imageSize: { width: 270, height: 129 }
      },
      children: [
        { data: { text: '新闻' } },
        { data: { text: '网页', priority: 1 } },
        { data: { text: '贴吧', priority: 2 } },
        { data: { text: '知道', priority: 2 } },
        { data: { text: '音乐', priority: 3 } },
        { data: { text: '图片', priority: 3 } },
        { data: { text: '视频', priority: 3 } },
        { data: { text: '地图', priority: 3 } },
        { data: { text: '百科', priority: 3 } },
        { data: { text: '更多', hyperlink: 'http://www.baidu.com/more' } }
      ]
    }
  })

  const onChange = (value) => {
    console.log('value', value)
  }

  return (
    <Kityminder
      ref={minder}
      value={value}
      style={{
        height: '600px'
      }}
      onChange={onChange}
    />
  )
}

ReactDOM.render(<App />, document.body)
