let b;

/**
 * Get 16-bit float.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param littleEndian Little endian.
 * @returns Float value.
 */
export function getFloat16(
	dataView: DataView,
	offset: number,
	littleEndian = false,
): number {
	let m = dataView.getUint16(offset, littleEndian);
	const s = m >> 8;
	let e = s & 127;
	m = (e & 3) * 256 + (m & 255);
	if ((e >>= 2) === 31) {
		m = m ? NaN : Infinity;
	} else {
		if (e) {
			m += 1024;
			e--;
		}
		m *= Math.pow(2, e - 24);
	}
	return (s >> 7) ? -m : m;
}

/**
 * Set 16-bit float.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param value Float value.
 * @param littleEndian Little endian.
 */
export function setFloat16(
	dataView: DataView,
	offset: number,
	value: number,
	littleEndian = false,
): void {
	b ??= new DataView(new ArrayBuffer(4));
	b.setFloat32(0, value);
	let f = b.getUint32(0);
	let v = f & 0x80000000;
	f ^= v;
	v >>= 16;
	if (f >= 0x47800000) {
		v |= 0x7c00 | (f > 0x7f800000 ? 512 | f >> 13 & 1023 : 0);
	} else if (f >= 0x33000000) {
		let e = f >> 23;
		if (f >= 0x38800000) {
			v |= e - 112 << 10 | f >> 13 & 1023;
			v += f >> 12 & (f << 20 ? 1 : v & 1);
		} else {
			e = 126 - e;
			f = f & 0x7fffff | 0x800000;
			v |= f >> e--;
			v += f >> e & (f << 32 - e ? 1 : v & 1);
		}
	}
	dataView.setUint16(offset, v, littleEndian);
}
