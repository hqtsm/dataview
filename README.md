# HQTSM: DataView

Extra DataView functions

# Features

- Pure TypeScript, run anywhere
- Optimized for speed and size

# Usage

## Float16

```js
import { getFloat16, setFloat16 } from '@hqtsm/dataview';

const data = new Uint8Array(4);
const view = new DataView(data.buffer);
setFloat16(view, 0, Math.PI);
setFloat16(view, 2, Math.LN10, true);
data; // Uint8Array(4) [ 66, 72, 155, 64 ]
getFloat16(view, 0); // 3.140625
getFloat16(view, 2, true); // 2.302734375
```

## Int24

```js
import { getInt24, setInt24 } from '@hqtsm/dataview';

const data = new Uint8Array(6);
const view = new DataView(data.buffer);
setInt24(view, 0, -1234);
setInt24(view, 3, -4567, true);
data; // Uint8Array(6) [ 255, 251, 46, 41, 238, 255 ]
getInt24(view, 0); // -1234
getInt24(view, 3, true); // -4567
```

## Uint24

```js
import { getUint24, setUint24 } from '@hqtsm/dataview';

const data = new Uint8Array(6);
const view = new DataView(data.buffer);
setUint24(view, 0, 12345678);
setUint24(view, 3, 11223344, true);
data; // Uint8Array(6) [ 188, 97, 78, 48, 65, 171 ]
getUint24(view, 0); // 12345678
getUint24(view, 3, true); // 11223344
```
