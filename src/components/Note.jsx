import { createElement } from 'react'

export default function Note(props) {
  return (
    <div style={{ background: '#fff', height: '100%' }}>{props.node.data.note}</div>
  )
}
