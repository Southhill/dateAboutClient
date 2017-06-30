// 导入可用的tools函数
import { isLikeArray, isFunction } from './tools.js'

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
/**
 * 定时执行迭代函数(数据)
 * @param  {Function} iteraFn        需定时执行的迭代函数
 * @param  {Number} [time=1]       定时执行的次数
 * @param  {Number} [duration=100] 间隔多长时间定时执行
 * @param  {[likeArray]} iteraObj       迭代函数的上下文
 * @return {[Boolean]}                执行完毕返回true,意外情况则返回false
 */
export function intervalForItera(iteraFn, time = 1, duration = 100, iteraObj) {
	if (!iteraFn) return false;
	if (isFunction(iteraFn)) {
		if(!isLikeArray(iteraObj)) {
			let count = 0;
			let interval = setInterval(function() {
				if (count > time) {
					clearInterval(interval);
					return true;
				}
				iteraFn();
				count++;
			}, duration);
		} else {
			let iteraObjArray = Array.prototype.slice.call(iteraObj);
			let count = 0;
			let interval = setInterval(function() {
				if (count > time) {
					clearInterval(interval);
					return true;
				}
				iteraFn.call(iteraObjArray[count]);
				count++;
			}, duration);
		}
	}

}
