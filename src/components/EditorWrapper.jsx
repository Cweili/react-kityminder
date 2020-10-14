import { createElement, useState, useEffect, useRef, useMemo } from 'react'

import { getKeyCode } from '../utils'

function isInputValue(e) {
  const keyCode = getKeyCode(e)

  // a-zA-Z
  if (keyCode >= 65 && keyCode <= 90) return true

  // 0-9 以及其上面的符号
  if (keyCode >= 48 && keyCode <= 57) return true

  // 小键盘区域 (除回车外)
  if (keyCode !== 108 && keyCode >= 96 && keyCode <= 111) return true

  return false
}

function isIntendToInput(e) {
  const keyCode = getKeyCode(e)

  if (e.ctrlKey || e.metaKey || e.altKey) return false

  if (isInputValue(e)) return true

  // 输入法
  if (keyCode === 229 || keyCode === 0) return true

  return false
}

export default function EditorWrapper(minder, props) {
  const valueRef = useRef()
  const editingNodeRef = useRef()
  const editorRef = useRef()
  const [initialValue, setInitialValue] = useState()
  const [editingNode, setEditingNode] = useState()

  const {
    editor: Editor,
    onEdit,
    onEditEnd
  } = props

  const setEditorValue = v => {
    valueRef.current = v
  }

  const setEditorEditingNode = v => {
    editingNodeRef.current = v
    setEditingNode(v)
  }

  const exitEdit = () => {
    setEditorEditingNode()
    minder.focus()
  }
  const onSubmit = (...args) => {
    const { node } = editingNodeRef.current || {}
    if (node && (!onEditEnd || (onEditEnd && onEditEnd(...args) !== false))) {
      node.setText(valueRef.current)
      minder.select(node, true)
      minder.fire('nodechange')
      minder.fire('contentchange')
      minder.getRoot().renderTree()
      minder.layout(300)
    }
    exitEdit()
  }

  useEffect(() => {
    const edit = (e) => {
      if (((onEdit && onEdit(e) !== false) || !onEdit)) {
        const node = minder.getSelectedNode()
        if (node) {
          const box = node.getRenderBox('TextRenderer')
          const { text = '' } = node.data
          const editingNode = {
            node,
            box
          }
          if (box.x > 0 || box.y > 0) {
            let value = text
            if (props.appendKey) {
              value += isInputValue(e.originEvent) ? e.originEvent.key : ''
            }
            setEditorEditingNode(editingNode)
            setInitialValue(value)
            setEditorValue(value)
          }
        }
      }
    }
    const dblclickName = 'dblclick'
    const dblclickHandler = edit
    const keydownName = 'keydown'
    const keydownHandler = (e) => {
      if (isIntendToInput(e.originEvent) && minder.getSelectedNode()) {
        edit(e)
      }
    }
    if (minder) {
      minder.on(dblclickName, dblclickHandler)
      minder.on(keydownName, keydownHandler)
    }
    return () => {
      if (minder) {
        minder.off(dblclickName, dblclickHandler)
        minder.off(keydownName, keydownHandler)
      }
    }
  }, [minder, onEdit])

  useEffect(() => {
    const escHandler = (evt) => {
      const keyCode = getKeyCode(evt)
      if (keyCode === window.kityminder.KeyMap.esc) {
        exitEdit()
      }
    }
    document.addEventListener('keydown', escHandler)
    return () => {
      document.removeEventListener('keydown', escHandler)
    }
  }, [minder])

  useEffect(() => {
    if (minder && editingNode && editorRef.current) {
      let inputEl
      for (const type of [
        'input',
        'textarea',
        'select'
      ]) {
        inputEl = editorRef.current.querySelector(type)
        if (inputEl) {
          inputEl.focus()
          break
        }
      }
    }
  }, [minder, Editor, initialValue, editingNode])

  return useMemo(() => (props) => editingNode ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      onClick={onSubmit}
    >
      <div
        ref={editorRef}
        style={{
          position: 'absolute',
          top: `${editingNode.box.y}px`,
          left: `${editingNode.box.x}px`,
          transform: 'translateY(-50%)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <Editor
          {...props}
          minder={minder}
          initialValue={initialValue}
          onSubmit={onSubmit}
          onChange={setEditorValue}
          onCancel={exitEdit}
        />
      </div>
    </div>
  ) : null, [minder, Editor, initialValue, editingNode])
}
