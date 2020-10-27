const {
  kity,
  kityminder
} = window

kityminder.Module.register('MarkModule', function () {
  var MARK_DATA = 'mark'

  // 标注的图形
  var MarkIcon = kity.createClass('MarkIcon', {
    base: kity.Group,

    constructor: function () {
      this.callBase()
      this.create()
      this.setId(Date.now())
    },

    setSize: function (size) {
      this.width = this.height = size
    },

    create: function () {
      const size = 12
      var p = Math.pow
      var r = Math.round

      const radius = r(Math.sqrt(p(size, 2) + p(size, 2)) / 2)

      var width = 2 * radius
      var height = 2 * radius

      console.log(width, height)

      const mask = new kity.Rect()
        .setSize(width, height)
        .setRadius(radius)
        .fill('#0099ff')

      const mark = new kity.Text()
        .setX(width / 2 - 0.5)
        .setY(height / 2)
        .setTextAnchor('middle')
        .setVerticalAlign('middle')
        .setFontSize(size - 2)
        .fill('#fff')

      this.addShapes([mask, mark])
      this.setSize(width)
      this.mask = mask
      this.mark = mark
    },

    setValue: function (value) {
      this.mark.setContent(value)
    }
  })

  /**
   * @command Mark
   * @description 设置节点的优先级信息
   * @param {mark} value 要设置的优先级（添加一个优先级小图标）
   *     取值为 0 移除优先级信息；
   *     取值为 1 - 9 设置优先级，超过 9 的优先级不渲染
   * @state
   *    0: 当前有选中的节点
   *   -1: 当前没有选中的节点
   */
  var MarkCommand = kity.createClass('SetMarkCommand', {
    base: kityminder.Command,
    execute: function (km, value) {
      var nodes = km.getSelectedNodes()
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].setData(MARK_DATA, value || null).render()
      }
      km.layout()
    },
    queryValue: function (km) {
      var nodes = km.getSelectedNodes()
      var val
      for (var i = 0; i < nodes.length; i++) {
        val = nodes[i].getData(MARK_DATA)
        if (val) break
      }
      return val || null
    },

    queryState: function (km) {
      return km.getSelectedNodes().length ? 0 : -1
    }
  })
  return {
    commands: {
      mark: MarkCommand
    },
    renderers: {
      right: kity.createClass('MarkRenderer', {
        base: kityminder.Render,

        create: function (node) {
          return new MarkIcon()
        },

        shouldRender: function (node) {
          return node.getData(MARK_DATA)
        },

        update: function (icon, node, box) {
          var data = node.getData(MARK_DATA)
          var spaceLeft = node.getStyle('space-left')
          var x
          var y

          icon.setValue(data)
          x = box.right + spaceLeft
          y = -icon.height / 2

          icon.setTranslate(x, y)

          return new kity.Box({
            x: x,
            y: y,
            width: icon.width,
            height: icon.height
          })
        }
      })
    }
  }
})
