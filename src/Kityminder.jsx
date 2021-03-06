import { createElement, useRef, useMemo, forwardRef } from 'react'

import useValue from './hooks/value'
import useEvents from './hooks/events'
import useChangeHandler from './hooks/changeHandler'

import Editor from './components/Editor'
import EditorWrapper from './components/EditorWrapper'
import Note from './components/Note'
import NoteWrapper from './components/NoteWrapper'

const domPropNames = [
  'id',
  'className',
  'style',
  'title',
  'tabIndex'
]

export default forwardRef(function Kityminder(props, ref) {
  const minderRef = useRef()
  let minder = minderRef.current

  const domProps = {}

  Object.keys(props).forEach((propKey) => {
    if (domPropNames.indexOf(propKey) >= 0) {
      domProps[propKey] = props[propKey]
    }
  })

  if (!minder) {
    minder = minderRef.current = new window.kityminder.Minder(props)
    if (props.onMinderChange) {
      setTimeout(() => {
        // fix warning: Cannot update a component while rendering a different component.
        props.onMinderChange(minder)
      }, 0)
    }
    if (ref) {
      ref.current = minder
    }
  }

  useValue(minder, props.value)
  useEvents(minder, props)
  useChangeHandler(minder, props.onChange)
  const EditorComponent = EditorWrapper(minder, Object.assign({
    Editor
  }, props))
  const NoteComponent = NoteWrapper(minder, Object.assign({
    Note
  }, props))

  return (
    <div
      {...domProps}
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        ...domProps.style
      }}
    >
      {useMemo(() => (
        <div
          ref={div => {
            if (div) {
              minder.renderTo(div)
              const receiver = div.querySelector('.km-receiver')
              if (receiver) {
                Object.assign(receiver.style, {
                  position: 'absolute',
                  left: '-99999px',
                  top: '-99999px'
                })
              }
            }
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
      <EditorComponent {...props} />
      <NoteComponent {...props} />
    </div>
  )
})
