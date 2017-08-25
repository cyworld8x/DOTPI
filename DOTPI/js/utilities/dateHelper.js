import Moment from 'moment';

export default class DateHelper{
    constructor(){
        //Moment('vi');
    }
    static getRelativeTime(date){
         return date.toString('hh:mm DD-MM-YYYY');
    }
 
    static parseDate(startDate) {
        var f = date.split(' ');
        var ms = f[0].split(':');
        var dmy = f[1].split('/');
        return new Date(Number(dmy[2]), Number(dmy[1]), Number(dmy[0]), ms[0], ms[1], 0);
    }

    static diffMinutes(inputDate,currentDate){
        return (currentDate.getFullYear() - inputDate.getFullYear())*365*30*24*60 + (currentDate.getMonth() +1 - inputDate.getMonth())*30*24*60 +(currentDate.getDate() - inputDate.getDate())*24*60
            +(currentDate.getHours() - inputDate.getHours())*60 + 
            +(currentDate.getMinutes() - inputDate.getMinutes());
    }
    static getLongDate(date){
       
        try{
            var inputDate = parseDate(date);
            var currentDate = new Date();
            var diffMinutes =diffMinutes(inputDate,currentDate);

            if(timeDiff>=60*24){                
                return date;
            }else if(timeDiff>=60){
                let hour = Math.floor(timeDiff/60);
                return hour + ' giờ trước';
            } else{
                return timeDiff + ' phút giờ trước';
            }
        }catch(error){
            return '';
        }
    }

    static getView(date, id){
        try{
            var inputDate = parseDate(date);
            var currentDate = new Date();
            var diffMinutes =diffMinutes(inputDate,currentDate);
            return (diffMinutes + Math.floor(Number(id)*200/1888)) + ' lượt xem' ;
        }
        catch(error){
            return Number(id)*2 + ' lượt xem';
        }
        return Number(id)*2 + ' lượt xem';
    }
}