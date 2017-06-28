/**
 * 在下一个整点定时执行任务
 * @param  {Function} fn    传入的任务函数
 * @param  {Boolean} bool    如果为true则返回一个包装好的Function
 * @return {undefined}         无返回值 */
export function nextIntegralPointExecute(callback, bool) {
	var date = new Date();
	var dateIntegralPoint = new Date();
	// 设置时间为当前时刻的下一个整点。
	dateIntegralPoint.setHours(date.getHours() + 1);
	dateIntegralPoint.setMinutes(0);
	dateIntegralPoint.setSeconds(0);
	var intervals = dateIntegralPoint - date;
	if (bool) {
		return (function() {
			setTimeout(callback, intervals);
		});
	}
	return (function() {
			setTimeout(callback, intervals);
		})();
}
/**
 * 定时任务包装函数
 * @param  {Function} fn    传入的任务函数
 * @param  {Number}   timer 定时间隔，单位为毫秒，默认为1小时
 * @return {Function}         返回一个包装好的setInterval函数
 */
export function integralPointTask(fn, timer) {
	timer = timer || 1000 * 60 * 60 * 1;//设定定时间隔的默认值为1小时
	setInterval(nextIntegralPointExecute(fn, true), timer);
}

export function intervalForLikeArray(likeArray, time, duration) {
	if (!likeArray) return false;
	if (isFunction(likeArray)) {
		var count = 0;
		var interval = setInterval(function() {
			if (count > time) {
				clearInterval(interval);
				return;
			}
			likeArray();
			count++;
		}, duration);
	}
	
}
function isLikeArray(obj) {
	return obj instanceof Array || typeof obj === 'object';	
}
function isFunction(fn) {
	return typeof fn === 'function';
}	
