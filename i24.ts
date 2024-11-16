/**
 * Get 24-bit signed integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param littleEndian Little endian.
 * @returns Integer value.
 */
export const getInt24 = (
	dataView: DataView,
	byteOffset: number,
	littleEndian = false,
): number => getUint24(dataView, byteOffset, littleEndian) << 8 >> 8;

/**
 * Get 24-bit unsigned integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param littleEndian Little endian.
 * @returns Integer value.
 */
export const getUint24 = (
	dataView: DataView,
	byteOffset: number,
	littleEndian = false,
): number => {
	const c = dataView.getUint8(byteOffset + 2);
	const b = dataView.getUint8(byteOffset + 1);
	const a = dataView.getUint8(byteOffset);
	return littleEndian ? a | b << 8 | c << 16 : a << 16 | b << 8 | c;
};

/**
 * Set 24-bit signed integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param value Integer value.
 * @param littleEndian Little endian.
 */
export const setInt24 = (
	dataView: DataView,
	byteOffset: number,
	value: number,
	littleEndian = false,
): void => setUint24(dataView, byteOffset, value, littleEndian);

/**
 * Set 24-bit unsigned integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param value Integer value.
 * @param littleEndian Little endian.
 */
export const setUint24 = (
	dataView: DataView,
	byteOffset: number,
	value: number,
	littleEndian = false,
): void => {
	let a, b, c;
	if (littleEndian) {
		c = value >> 16 & 255;
		b = value >> 8 & 255;
		a = value & 0xff;
	} else {
		c = value & 0xff;
		b = value >> 8 & 255;
		a = value >> 16 & 255;
	}
	if (byteOffset <= -1) {
		// Trigger native OOB exception.
		dataView.setUint8(byteOffset, a);
	}
	dataView.setUint8(byteOffset + 2, c);
	dataView.setUint8(byteOffset + 1, b);
	dataView.setUint8(byteOffset, a);
};
