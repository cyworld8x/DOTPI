

export default class DateHelper{
    constructor(){
    }
    static getRelativeTime(date){
         return date.toString('hh:mm DD-MM-YYYY');
    }
 
    static parseDate(date) {
        let f = date.split(' ');
        let ms = f[0].split(':');
        let dmy = f[1].split('/');
        return new Date(Number(dmy[2]), Number(dmy[1]), Number(dmy[0]), ms[0], ms[1], 0);
    }

    static calDiffMinutes(inputDate,currentDate){
        return (currentDate.getFullYear() - inputDate.getFullYear())*365*30*24*60 + (currentDate.getMonth() +1 - inputDate.getMonth())*30*24*60 +(currentDate.getDate() - inputDate.getDate())*24*60
            +(currentDate.getHours() - inputDate.getHours())*60 + 
            +(currentDate.getMinutes() - inputDate.getMinutes());
    }
    static getLongDate(date){
       
        try{
            let inputDate = this.parseDate(date);
            let currentDate = new Date();
            let diffMinutes =this.calDiffMinutes(inputDate,currentDate);
            
            if(diffMinutes>=60*24){                
                return date;
            }else if(diffMinutes>=60){
                let hour = Math.floor(diffMinutes/60);
                return hour + ' giờ trước';
            } else if(diffMinutes>0){
                return diffMinutes + ' phút trước';
            } else {
                return diffMinutes + ' phút trước';
            }
        }catch(error){
            return error;
        }
    }

    static getView(date, id){
        try{
            let inputDate = this.parseDate(date);
            let currentDate = new Date();
            let diffMinutes =this.calDiffMinutes(inputDate,currentDate);
            let addViews = Math.floor(Number(id)/1000);
            if(addViews>5000){
                addViews = Number(id);
            }
            diffMinutes = diffMinutes+ addViews;
            if(addViews>20000){
                diffMinutes = 20000 + Number(id);
            }
            return (diffMinutes) + ' lượt xem' ;
        }
        catch(error){
            return Number(id)*2 + ' lượt xem';
        }
        return Number(id)*2 + ' lượt xem';
    }
}