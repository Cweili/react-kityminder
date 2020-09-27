export function upperFirst(string) {
  return string[0].toUpperCase() + string.substr(1)
}

export function getKeyCode(evt) {
  return evt.keyCode || evt.witch
}
