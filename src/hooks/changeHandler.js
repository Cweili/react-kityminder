import { useEffect } from 'react'

// change 事件监听
export default function useChangeHandler(minder, onChange) {
  useEffect(() => {
    const changeHandler = (e) => onChange(e.minder.exportJson())
    if (minder && onChange) {
      minder.on('contentchange', changeHandler)
    }
    return () => {
      if (minder && onChange) {
        minder.off('contentchange', changeHandler)
      }
    }
  }, [minder, onChange])
}
