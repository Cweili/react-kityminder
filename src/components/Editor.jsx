import { createElement, useState } from 'react'

import { getKeyCode } from '../utils'

export default function Editor(props) {
  const [value, setValue] = useState(props.initialValue)

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

  const onChange = ({ target: { value } }) => {
    setValue(value)
    props.onChange(value)
  }

  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeydown}
      onBlur={props.onSubmit}
    />
  )
}
