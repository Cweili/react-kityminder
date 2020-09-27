import { useEffect } from 'react'

const handlerNameToEventName = (string) =>
  string.substr(2, 1).toLowerCase() + string.substr(3)

export const eventNames = (
  'click,dblclick,mousedown,mousemove,mouseup,keydown,keyup,keypress,touchstart,touchend,touchmove,' +
  'beforeExecCommand,preExecCommand,afterExecCommand,' +
  'selectionchange,contentchange,interactchange'
).split(',')

// 数据
export function useEvents(minder, props, handlerPropKeys) {
  // 事件监听
  useEffect(() => {
    if (minder) {
      handlerPropKeys.forEach((handlerProp) => {
        if (props[handlerProp]) {
          minder.on(handlerNameToEventName(handlerProp), props[handlerProp])
        }
      })
    }
    return () => {
      if (minder) {
        handlerPropKeys.forEach((handlerProp) => {
          if (props.handlerProp) {
            minder.off(handlerNameToEventName(handlerProp), props[handlerProp])
          }
        })
      }
    }
  }, [minder, ...handlerPropKeys.map((handlerProp) => props[handlerProp])])
}
