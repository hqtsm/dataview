import { assertEquals } from '@std/assert';

import { getFloat16, setFloat16 } from './16.ts';
import f16 from '../spec/f16.json' with { type: 'json' };
import f64i16 from '../spec/f64i16.json' with { type: 'json' };

const F16 = (f16 as (string | number)[]).map(Number);
const F64I16 = (f64i16 as (string | number)[][]).map((a) => a.map(Number)) as [
	number,
	number,
][];

Deno.test('getFloat16 BE', () => {
	const dataView = new DataView(new ArrayBuffer(2));
	for (let i = 0; i < F16.length; i++) {
		dataView.setUint16(0, i, false);
		assertEquals(getFloat16(dataView, 0, false), F16[i]);
	}
});

Deno.test('getFloat16 LE', () => {
	const dataView = new DataView(new ArrayBuffer(2));
	for (let i = 0; i < F16.length; i++) {
		dataView.setUint16(0, i, true);
		assertEquals(getFloat16(dataView, 0, true), F16[i]);
	}
});

Deno.test('setFloat16 BE', () => {
	const dataView = new DataView(new ArrayBuffer(2));
	for (let i = 0; i < F16.length; i++) {
		setFloat16(dataView, 0, F16[i], false);
		assertEquals(getFloat16(dataView, 0, false), F16[i]);
		setFloat16(dataView, 0, F16[i] + Number.EPSILON, false);
		assertEquals(getFloat16(dataView, 0, false), F16[i]);
		setFloat16(dataView, 0, F16[i] - Number.EPSILON, false);
		assertEquals(getFloat16(dataView, 0, false), F16[i]);
	}
	for (const [f64, i16] of F64I16) {
		setFloat16(dataView, 0, f64, false);
		assertEquals(dataView.getUint16(0, false), i16);
	}
});

Deno.test('setFloat16 LE', () => {
	const dataView = new DataView(new ArrayBuffer(2));
	for (let i = 0; i < F16.length; i++) {
		setFloat16(dataView, 0, F16[i], true);
		assertEquals(getFloat16(dataView, 0, true), F16[i]);
		setFloat16(dataView, 0, F16[i] + Number.EPSILON, true);
		assertEquals(getFloat16(dataView, 0, true), F16[i]);
		setFloat16(dataView, 0, F16[i] - Number.EPSILON, true);
		assertEquals(getFloat16(dataView, 0, true), F16[i]);
	}
	for (const [f64, i16] of F64I16) {
		setFloat16(dataView, 0, f64, true);
		assertEquals(dataView.getUint16(0, true), i16);
	}
});
