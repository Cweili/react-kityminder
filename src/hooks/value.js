import { useEffect } from 'react'

// 数据
export default function useValue(minder, value) {
  useEffect(() => {
    if (minder) {
      // const animationOptionName = 'layoutAnimationDuration'
      // const animationDuration = minder.getOption(animationOptionName)
      // if (animationDuration) {
      //   minder.setOption(animationOptionName, 0)
      // }
      minder.importJson(value)
      // if (animationDuration) {
      //   minder.setOption(animationOptionName, animationDuration)
      // }
    }
  }, [minder, value])
}
