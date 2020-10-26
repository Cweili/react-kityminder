import { useEffect } from 'react'

const eventHandlerPrefixRE = /^on(\w+)$/
const getEventName = (propName) => {
  const name = eventHandlerPrefixRE.exec(propName)
  return name && name[1].toLowerCase()
}
const forEachHandler = (minder, props, cb) => {
  if (minder) {
    Object.keys(props).forEach((propName) => {
      const eventName = getEventName(propName)
      if (eventName && handlerPropKeys.indexOf(eventName) >= 0) {
        cb(eventName, propName)
      }
    })
  }
}
const eventNames = (
  'click,dblclick,mousedown,mousemove,mouseup,mousewheel,keydown,keyup,keypress,touchstart,touchend,touchmove,' +
  'execcommand,' +
  'selectionchange,contentchange,interactchange,' +
  'editnoterequest,shownoterequest,hidenoterequest,' +
  'nodechange,editnode'
).split(',')
let handlerPropKeys = []
eventNames.map(
  (eventName) => {
    handlerPropKeys = handlerPropKeys.concat([
      eventName,
      `before${eventName}`,
      `pre${eventName}`,
      `after${eventName}`
    ])
  }
)

// 数据
export default function useEvents(minder, props) {
  // 事件监听
  useEffect(() => {
    const handlers = {}
    forEachHandler(minder, props, (eventName, propName) => {
      handlers[eventName] = props[propName]
      minder.on(eventName, props[propName])
    })
    return () => {
      forEachHandler(minder, props, (eventName) => {
        minder.off(eventName, handlers[eventName])
      })
    }
  }, [minder, ...handlerPropKeys.map((handlerProp) => props[handlerProp])])
}
