/**
 * 在下一个整点定时执行任务
 * @param  {Function} fn    传入的任务函数
 * @param  {Number}   timer 间隔时间，单位为毫秒，所以间隔30分钟应该为：1000 * 60 * 30,默认为1小时
 * @return {undefined}         无返回值
 */
function nextIntegralPointExecute(fn, timer) {
	var date = new Date();
	var dateIntegralPoint = new Date();
	dateIntegralPoint.setHours(date.getHours() + 1);
	dateIntegralPoint.setMinutes(0);
	dateIntegralPoint.setSeconds(0);
	var intervals = dateIntegralPoint - date;
	setTimeout(integralPointTask(fn, timer), intervals);
}
/**
 * 定时任务包装函数
 * @param  {Function} fn    传入的任务函数
 * @param  {Number}   timer 定时间隔，单位为毫秒，默认为1小时
 * @return {Function}         返回一个包装好的setInterval函数
 */
function integralPointTask(fn, timer) {
	var timer = timer || 1000 * 60 * 60 * 1;//设定定时间隔的默认值为1小时
	return setInterval(fn, timer);
}