/**
 * 在下一个整点定时执行任务
 * @param  {Function} fn    传入的任务函数
 * @param  {Boolean} bool    如果为true则返回一个包装好的Function
 * @return {undefined}         无返回值
 */
function nextIntegralPointExecute(cb, bool) {
	var date = new Date();
	var dateIntegralPoint = new Date();
	dateIntegralPoint.setHours(date.getHours() + 1);
	dateIntegralPoint.setMinutes(0);
	dateIntegralPoint.setSeconds(0);
	var intervals = dateIntegralPoint - date;
	if (bool) {
		return (function() {
			setTimeout(cb, intervals);
		});
	}
	return (function() {
			setTimeout(cb, intervals);
		})();
}
/**
 * 定时任务包装函数
 * @param  {Function} fn    传入的任务函数
 * @param  {Number}   timer 定时间隔，单位为毫秒，默认为1小时
 * @return {Function}         返回一个包装好的setInterval函数
 */
function integralPointTask(fn, timer) {
	timer = timer || 1000 * 60 * 60 * 1;//设定定时间隔的默认值为1小时
	setInterval(nextIntegralPointExecute(fn, true), timer);
}



function testFunction() {
	console.log(233);
}

integralPointTask(testFunction);