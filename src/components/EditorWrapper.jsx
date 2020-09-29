import { createElement, useState, useEffect } from 'react'

import { getKeyCode } from '../utils'

function isInputValue(e) {
  const keyCode = getKeyCode(e)

  // a-zA-Z
  if (keyCode >= 65 && keyCode <= 90) return true

  // 0-9 以及其上面的符号
  if (keyCode >= 48 && keyCode <= 57) return true

  // 小键盘区域 (除回车外)
  if (keyCode !== 108 && keyCode >= 96 && keyCode <= 111) return true

  // 小键盘区域 (除回车外)
  // @yinheli from pull request
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

export default function EditorWrapper(minder, Editor, onEdit) {
  const [editingNode, setEditingNode] = useState()

  const exitEdit = () => {
    setEditingNode()
    minder.focus()
  }

  useEffect(() => {
    const edit = (e) => {
      if (((onEdit && onEdit(e) !== false) || !onEdit)) {
        const node = minder.getSelectedNode()
        const editingNode = {
          node,
          value: isIntendToInput(e.originEvent) ? e.originEvent.key : '',
          box: node.getRenderBox('TextRenderer')
        }
        setEditingNode(editingNode)
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
  }, [])

  return (props) => editingNode ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      onClick={exitEdit}
    >
      <div
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
          value={editingNode.value}
          onChange={(value) => {
            const { node } = editingNode
            node.setText(value)
            minder.fire('contentchange')
            minder.getRoot().renderTree()
            minder.layout(300)
            exitEdit()
          }}
          onCancel={exitEdit}
        />
      </div>
    </div>
  ) : null
}
