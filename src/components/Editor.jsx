import { createElement } from 'react'

import { getKeyCode } from '../utils'

export default function Editor(props) {
  const onKeydown = (evt) => {
    evt.stopPropagation()
    const { KeyMap } = window.kityminder
    const keyCode = getKeyCode(evt)
    if (keyCode === KeyMap.enter) {
      props.onSubmit()
    }
    if (keyCode === KeyMap.esc) {
      props.onCancel()
    }
  }

  const onChange = (evt) => {
    props.onChange(evt.target.value)
  }

  return (
    <input
      autoFocus
      value={props.value}
      onChange={onChange}
      onKeyDown={onKeydown}
      onBlur={props.onSubmit}
    />
  )
}
