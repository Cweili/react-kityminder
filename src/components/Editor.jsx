import { createElement, useState } from 'react'

import { getKeyCode } from '../utils'

export default function Editor(props) {
  const [value, setValue] = useState(props.value)

  const onKeydown = (evt) => {
    evt.stopPropagation()
    const { KeyMap } = window.kityminder
    const keyCode = getKeyCode(evt)
    if (keyCode === KeyMap.enter) {
      props.onChange(evt.target.value)
    }
    if (keyCode === KeyMap.esc) {
      props.onCancel()
    }
  }

  const onChange = (evt) => {
    setValue(evt.target.value)
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={onChange}
      onKeyDown={onKeydown}
    />
  )
}
