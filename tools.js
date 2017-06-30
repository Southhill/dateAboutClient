// 工具方法
export function isLikeArray(obj) {
	return (obj instanceof Array || typeof obj === 'object') && obj.length !== undefined;
}
export function isFunction(fn) {
	return typeof fn === 'function';
}
