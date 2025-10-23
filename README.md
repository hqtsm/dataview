# HQTSM: DataView

DataView utilities

![dataview](https://img.shields.io/badge/dataview-eee)
![float16](https://img.shields.io/badge/float16-eee)
![int24](https://img.shields.io/badge/int24-eee)
![uint24](https://img.shields.io/badge/uint24-eee)

[![JSR](https://jsr.io/badges/@hqtsm/dataview)](https://jsr.io/@hqtsm/dataview)
[![npm](https://img.shields.io/npm/v/@hqtsm/dataview.svg)](https://npmjs.com/package/@hqtsm/dataview)
[![CI](https://github.com/hqtsm/dataview/actions/workflows/ci.yaml/badge.svg)](https://github.com/hqtsm/dataview/actions/workflows/ci.yaml)

# Features

- Pure TypeScript, run anywhere
- Zero dependencies
- Optimized for speed and size
- Tree shaking friendly design

# Usage

## Float16

```js
import { getFloat16, setFloat16 } from '@hqtsm/dataview';

const data = new Uint8Array(4);
const view = new DataView(data.buffer);
setFloat16(view, 0, Math.PI);
setFloat16(view, 2, Math.LN10, true);
console.assert(data.join(', ') === '66, 72, 155, 64');
console.assert(getFloat16(view, 0) === 3.140625);
console.assert(getFloat16(view, 2, true) === 2.302734375);
```

## Int24

```js
import { getInt24, setInt24 } from '@hqtsm/dataview';

const data = new Uint8Array(6);
const view = new DataView(data.buffer);
setInt24(view, 0, -1234);
setInt24(view, 3, -4567, true);
console.assert(data.join(', ') === '255, 251, 46, 41, 238, 255');
console.assert(getInt24(view, 0) === -1234);
console.assert(getInt24(view, 3, true) === -4567);
```

## Uint24

```js
import { getUint24, setUint24 } from '@hqtsm/dataview';

const data = new Uint8Array(6);
const view = new DataView(data.buffer);
setUint24(view, 0, 12345678);
setUint24(view, 3, 11223344, true);
console.assert(data.join(', ') === '188, 97, 78, 48, 65, 171');
console.assert(getUint24(view, 0) === 12345678);
console.assert(getUint24(view, 3, true) === 11223344);
```
