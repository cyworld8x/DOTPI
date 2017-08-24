import Moment from 'moment';

export default class DateHelper{
    constructor(){
        //Moment('vi');
    }
    static getRelativeTime(date){
        // var moment = Moment(date);        
        // return moment.locale('vi').startOf('hour').fromNow();
         return '';
    }

    static getLongDate(date){
        // try{
        //     var moment = Moment(new Date());
        //     moment.locale('vi');
        //     return moment.format('hh:mm DD-MM-YYYY') ;
        // }
        // catch(error){
        //     return '';
        // }
        return '';
    }

    static getView(date, id){
        try{
        //    var moment = Moment(date);
        //    moment.locale('vi');
        //    return (Number(Moment(new Date()).diff(moment, 'minutes')) + Number(id)*2) + ' lượt xem' ;
        }
        catch(error){
            return Number(id)*2 + ' lượt xem';
        }
        return Number(id)*2 + ' lượt xem';
    }
}