import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe',
})
export class TimePipePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    var date: Date = new Date(value.toString().slice(0, 10));
    var dateTotal: number = date.getTime();
    var arrTime = [];
    arrTime = value
      .toString()
      .slice(11, value.length - 1)
      .split(':');
    var totalHour: number =
      1000 *
      (Number(arrTime[0]) * 60 * 60 +
        Number(arrTime[1]) * 60 +
        Number(arrTime[2]));
    var timePost: number = Date.now() - (dateTotal + totalHour);
    if (timePost < 120000) {
      return '1 minute';
    }

    if (timePost < 3600000) {
      return Math.round(timePost / 60000) + ' minutes';
    }
    if (timePost < 7200000) {
      return '1 hour';
    }
    if (timePost < 86400000) {
      return Math.round(timePost / 3600000) + ' hours';
    } else {
      return Math.round(timePost / 86400000) + ' days';
    }
  }
}
