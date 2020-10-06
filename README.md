# React Kityminder

[![npm][badge-version]][npm]
[![bundle size][badge-size]][bundlephobia]
[![npm downloads][badge-downloads]][npm]
[![license][badge-license]][license]


[![github][badge-issues]][github]
[![build][badge-build]][travis]
[![coverage][badge-coverage]][coveralls]


Mind map for react, based on [kityminder](https://github.com/fex-team/kityminder-core#readme).

## Installation

### NPM

```
npm install react-kityminder --save
```

```js
import Kityminder from 'react-kityminder';
```

### Browser

Direct `<script>` include

```html
<script src="https://cdn.jsdelivr.net/npm/kity"></script>
<script src="https://cdn.jsdelivr.net/npm/kityminder-core"></script>
<script src="https://cdn.jsdelivr.net/npm/react-kityminder"></script>
```

## Usage

```js
import { useState, useRef } from 'react'

function App(props) {
  const [value, setValue] = useState({})

  const minderRef = useRef()
  const minder = minderRef.current

  const onChange = setValue

  return (
    <Kityminder
      ref={minderRef}
      value={value}
      onChange={onChange}
    />
  )
}
```


[badge-version]: https://img.shields.io/npm/v/react-kityminder.svg
[badge-downloads]: https://img.shields.io/npm/dt/react-kityminder.svg
[npm]: https://www.npmjs.com/package/react-kityminder

[badge-size]: https://img.shields.io/bundlephobia/minzip/react-kityminder.svg
[bundlephobia]: https://bundlephobia.com/result?p=react-kityminder

[badge-license]: https://img.shields.io/npm/l/react-kityminder.svg
[license]: https://github.com/Cweili/react-kityminder/blob/master/LICENSE

[badge-issues]: https://img.shields.io/github/issues/Cweili/react-kityminder.svg
[github]: https://github.com/Cweili/react-kityminder

[badge-build]: https://img.shields.io/travis/com/Cweili/react-kityminder/master.svg
[travis]: https://travis-ci.com/Cweili/react-kityminder

[badge-coverage]: https://img.shields.io/coveralls/github/Cweili/react-kityminder/master.svg
[coveralls]: https://coveralls.io/github/Cweili/react-kityminder?branch=master
