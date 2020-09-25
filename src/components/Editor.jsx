import { createElement } from 'react'

export default function Editor(props) {
  const onKeydown = (evt) => {
    evt.stopPropagation()
    const { KeyMap } = window.kityminder
    const keyCode = evt.keyCode || evt.which
    if (keyCode === KeyMap.enter) {
      props.onChange(evt.target.value)
    }
    if (keyCode === KeyMap.esc) {
      props.onCancel()
    }
  }

  return <input autoFocus onKeyDown={onKeydown} />
}
