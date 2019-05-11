import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInterval'
})

export class TimeIntervalPipe implements PipeTransform {

  // Object conatins all the keywords to highlight with respective color
  transform(updateTime: Date, currentTime: Date): string {
    if(!updateTime) {
      return 'Not Yet Started';
    }
    let returnStr: string = 'Started ';
    if(((new Date()).getTime() - updateTime.getTime())/1000 <= 5) {
        return `${returnStr} just now`;
    }
    let seconds: number = Math.abs(Math.round((updateTime.getTime() - currentTime.getTime()) / 1000));
    if(seconds < 60) {
        return `${returnStr} ${seconds} secs ago`; //seconds
    }else if(seconds >= 60 && seconds < 3600) {
        let time: string = this.calculateTime(seconds, 60);
        return `${returnStr} ${time} ${time == '1' ? 'min': 'mins'}  ago`; //minutes
    }else if(seconds >= 3600 && seconds < 86400) {
        let time: string = this.calculateTime(seconds, 3600);
        return `${returnStr} ${time} ${time == '1' ? 'hour': 'hours'}  ago`; //hours
    }else if(seconds >= 86400 && seconds < 604800) {
        let time: string = this.calculateTime(seconds, 86400);
        return `${returnStr} ${time} ${time == '1' ? 'day': 'days'}  ago`; //days
    }else if(seconds >= 604800 && seconds < 2628000) {
        let time: string = this.calculateTime(seconds, 604800);
        return `${returnStr} ${time} ${time == '1' ? 'week': 'weeks'}  ago`; //week
    }else if(seconds >= 2628000 && seconds < 31536000) {
        let time: string = this.calculateTime(seconds, 2628000);
        return `${returnStr} ${time} ${time == '1' ? 'month': 'months'}  ago`; //month
    }else if(seconds >= 31536000) {
        let time: string = this.calculateTime(seconds, 31536000);
        return `${returnStr} ${time} ${time == '1' ? 'year': 'years'}  ago`; //year
    }
  }

  calculateTime(seconds: number, num: number) {
    return Math.round(seconds/num).toString();
  }

}
