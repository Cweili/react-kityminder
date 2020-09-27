import { createElement, useRef, useMemo, forwardRef } from 'react'
import 'kity'
import 'kityminder-core'

import useValue from './hooks/value'
import { useEvents, eventNames } from './hooks/events'
import useChangeHandler from './hooks/changeHandler'

import Editor from './components/Editor'
import EditorWrapper from './components/EditorWrapper'

import { upperFirst } from './utils'

const handlerPropKeys = eventNames.map(eventName => `on${upperFirst(eventName)}`)
const propKeys = [
  'value',
  'editor',
  'onChange'
].concat(handlerPropKeys)

export default forwardRef(function Kityminder(props, ref) {
  const minderRef = useRef()
  let minder = minderRef.current

  const domProps = {}

  Object.keys(props).forEach((propKey) => {
    if (propKeys.indexOf(propKey) < 0) {
      domProps[propKey] = props[propKey]
    }
  })

  if (!minder) {
    minder = minderRef.current = new window.kityminder.Minder(props)
    if (ref) {
      ref.current = minder
    }
  }

  useValue(minder, props.value)
  useEvents(minder, props, handlerPropKeys)
  useChangeHandler(minder, props.onChange)
  const EditorComponent = EditorWrapper(minder, props.editor || Editor, props.onEdit)

  return (
    <div {...domProps} style={{ position: 'relative', ...domProps.style }}>
      {useMemo(() => (
        <div
          ref={div => {
            minder.renderTo(div)
            Object.assign(div.querySelector('.km-receiver').style, {
              position: 'absolute',
              left: '-99999px',
              top: '-99999px'
            })
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        />
      ), [minder])}
      <EditorComponent />
    </div>
  )
})
