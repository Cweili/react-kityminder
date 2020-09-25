import { createElement, useState, useEffect } from 'react'

function isIntendToInput(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false

  // a-zA-Z
  if (e.keyCode >= 65 && e.keyCode <= 90) return true

  // 0-9 以及其上面的符号
  if (e.keyCode >= 48 && e.keyCode <= 57) return true

  // 小键盘区域 (除回车外)
  if (e.keyCode !== 108 && e.keyCode >= 96 && e.keyCode <= 111) return true

  // 小键盘区域 (除回车外)
  // @yinheli from pull request
  if (e.keyCode !== 108 && e.keyCode >= 96 && e.keyCode <= 111) return true

  // 输入法
  if (e.keyCode === 229 || e.keyCode === 0) return true

  return false
}

export default function EditorWrapper(minder, Editor, onEdit) {
  const [editingNode, setEditingNode] = useState()

  const focusMinder = () => minder.getRenderTarget().focus()
  const exitEdit = () => {
    setEditingNode()
    focusMinder()
  }

  useEffect(() => {
    const edit = (e) => {
      if (((onEdit && onEdit(e) !== false) || !onEdit)) {
        const node = minder.getSelectedNode()
        const editingNode = {
          node,
          point: node.getLayoutPoint()
        }
        setEditingNode(editingNode)
      }
    }
    const dblclickName = 'dblclick'
    const dblclickHandler = edit
    const keydownName = 'keypress'
    const keydownHandler = (e) => {
      if (isIntendToInput(e.kityEvent.originEvent) && e.getTargetNode()) {
        edit(e)
      }
    }
    if (minder) {
      minder.on(dblclickName, dblclickHandler)
      minder.on(keydownName, keydownHandler)
      const originalEditor = document.querySelector('.km-receiver')
      originalEditor && originalEditor.remove()
    }
    return () => {
      if (minder) {
        minder.off(dblclickName, dblclickHandler)
        minder.off(keydownName, keydownHandler)
      }
    }
  }, [minder, onEdit])

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
          top: '50%',
          left: '50%',
          transform: `translate(${editingNode.point.x}px, ${editingNode.point.y}px)`
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ transform: 'translateX(-50%)' }}>
          <Editor
            {...props}
            onChange={(value) => {
              const { node } = editingNode
              node.setText(value)
              minder.getRoot().renderTree()
              exitEdit()
            }}
            onCancel={exitEdit}
          />
        </div>
      </div>
    </div>
  ) : null
}
