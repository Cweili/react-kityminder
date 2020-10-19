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
        { data: { text: '网页' } },
        { data: { text: '贴吧' } },
        { data: { text: '知道' } },
        { data: { text: '音乐' } },
        { data: { text: '图片' } },
        { data: { text: '视频' } },
        { data: { text: '地图' } },
        { data: { text: '百科' } },
        {
          data: {
            text: '更多',
            note: '注释'
          }
        }
      ]
    }
  })

  const onChange = (value) => {
    console.log('value', value)
  }

  return (
    <div style={{ margin: '10px', padding: '10px' }}>
      <Kityminder
        ref={minder}
        value={value}
        style={{
          height: '600px'
        }}
        onChange={onChange}
        appendKey
      />
    </div>
  )
}

ReactDOM.render(<App />, document.body)
