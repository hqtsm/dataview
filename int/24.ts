/**
 * @module
 *
 * 24-bit integer operations.
 */

/**
 * Get 24-bit signed integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param littleEndian Little endian.
 * @returns Integer value.
 */
export function getInt24(
	dataView: DataView,
	byteOffset: number,
	littleEndian?: boolean,
): number {
	return getUint24(dataView, byteOffset, littleEndian) << 8 >> 8;
}

/**
 * Get 24-bit unsigned integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param littleEndian Little endian.
 * @returns Integer value.
 */
export function getUint24(
	dataView: DataView,
	byteOffset: number,
	littleEndian?: boolean,
): number {
	const b = dataView.getUint8((byteOffset |= 0) + 2);
	const a = dataView.getUint16(byteOffset, littleEndian);
	return littleEndian ? a | b << 16 : a << 8 | b;
}

/**
 * Set 24-bit signed integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param value Integer value.
 * @param littleEndian Little endian.
 */
export function setInt24(
	dataView: DataView,
	byteOffset: number,
	value: number,
	littleEndian?: boolean,
): void {
	setUint24(dataView, byteOffset, value, littleEndian);
}

/**
 * Set 24-bit unsigned integer.
 *
 * @param dataView Data view.
 * @param byteOffset Byte offset.
 * @param value Integer value.
 * @param littleEndian Little endian.
 */
export function setUint24(
	dataView: DataView,
	byteOffset: number,
	value: number,
	littleEndian?: boolean,
): void {
	let a, b = value & 65280;
	if (littleEndian) {
		b |= value >> 16 & 255;
		a = value & 255;
	} else {
		b |= value & 255;
		a = value >> 16 & 255;
	}
	if ((byteOffset |= 0) < 0) {
		// Trigger native OOB exception.
		dataView.setUint8(byteOffset, a);
	}
	dataView.setUint16(byteOffset + 1, b);
	dataView.setUint8(byteOffset, a);
}
