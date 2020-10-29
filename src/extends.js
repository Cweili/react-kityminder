export function extendsKityminder(kityminder) {
  // fix: detached node getMinder() returns undefined
  kityminder.Minder.prototype.attachNode = function (node) {
    const _this = this
    const rc = _this.getRenderContainer()
    node.traverse(function (current) {
      current.attached = true
      current.minder = _this
      rc.addShape(current.getRenderContainer())
    })
    rc.addShape(node.getRenderContainer())
    _this.fire('nodeattach', {
      node
    })
  }
  kityminder.Node.prototype.getMinder = function () {
    return this.getRoot().minder || this.minder
  }
}
