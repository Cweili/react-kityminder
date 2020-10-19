import { createElement, useState, useEffect, useCallback, useMemo } from 'react'

export default function NoteWrapper(minder, props) {
  const [showingNode, setShowingNode] = useState()

  const {
    Note
  } = props

  const showNote = useCallback(({ node }) => {
    if (node) {
      const box = node.getRenderer('OutlineRenderer').getRenderShape().getRenderBox('view')
      const editingNode = {
        node,
        box
      }
      if (box.x > 0 || box.y > 0) {
        setShowingNode(editingNode)
      }
    }
  }, [])

  const hideNote = useCallback(() => {
    setShowingNode()
  }, [])

  useEffect(() => {
    const showNodeName = 'shownoterequest'
    const mousewheel = 'mousewheel'
    if (minder) {
      minder.on(showNodeName, showNote)
      minder.on(mousewheel, hideNote)
      document.addEventListener(mousewheel, hideNote)
    }
    return () => {
      if (minder) {
        minder.off(showNodeName, showNote)
        minder.off(mousewheel, hideNote)
        document.removeEventListener(mousewheel, hideNote)
      }
    }
  }, [minder])

  return useMemo(() => (props) => showingNode ? (
    <div
      style={{
        position: 'absolute',
        top: `${showingNode.box.y + showingNode.box.height / 2}px`,
        left: `${showingNode.box.x}px`,
        width: `${showingNode.box.width}px`,
        height: `${showingNode.box.height}px`,
        transform: 'translateY(-50%)'
      }}
      onMouseOut={hideNote}
    >
      <Note
        {...props}
        node={showingNode.node}
      />
    </div>
  ) : null, [minder, Note, showingNode])
}
