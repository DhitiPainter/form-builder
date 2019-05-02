// import { getCurrentDateTime } from '../../../../../libsyn-mp.modules/libsyn-mp.shared/helpers/datetime';
import { isNullOrUndefined } from 'util';
import * as  moment from 'moment';

const dtFormat = {
    ShortDateFormat: 'DD/MM/YYYY',
    DateTimeFormat: 'DD-MM-YYYY hh:mm A',
    DateTimeSecondFormat: 'DD-MM-YYYY hh:mm:ss A',
    YYYYMMDDFormat: 'YYYY-MM-DD',
    MMMYYYY: 'MMM-YYYY',
    YYYYMMDDHHmmss: 'YYYY-MM-DD HH:mm:ss',
    MMMDDYYYY: 'MMM DD YYYY',
    DDMMMMYYYY: 'DD-MMMM-YYYY',
    MMDDYYYYFormat: 'MM/DD/YYYY',
    MMDDYYYYDashFormat: 'MM-DD-YYYY',
    ChatDateTime: 'MM/DD/YYYY h:mm A',
    MMDDYYYYHHmmss: 'MM/dd/yyyy hh:mm:ss',
    MMDDYYHHmmss: 'MM/DD/YYYY hh:mm:ss',
    hhmmss: 'hh:mm:ss'
};

export class DateTimeHelper {

    static currentDateTime() {
        return {
            DateTimeMoment: moment(),
            ValueOf: moment().valueOf(),
            ShortDate: this.formatDateTime(moment()).ShortDate,
            DateTime: this.formatDateTime(moment()).DateTime,
            DateTimeSecond: this.formatDateTime(moment()).DateTimeSecond,
            YYYYMMDDFormat: this.formatDateTime(moment()).YYYYMMDDFormat
        };
    }

    static formatDateTime(val: any) {
        return {
            DateTimeMoment: moment(val),
            ValueOf: moment(val).valueOf(),
            ShortDate: moment(val).format(dtFormat.ShortDateFormat),
            DateTime: moment(val).format(dtFormat.DateTimeFormat),
            DateTimeSecond: moment(val).format(dtFormat.DateTimeSecondFormat),
            YYYYMMDDFormat: moment(val).format(dtFormat.YYYYMMDDFormat),
            MMMYYYY: moment(val).format(dtFormat.MMMYYYY),
            YYYYMMDDHHmmss: moment(val).format(dtFormat.YYYYMMDDHHmmss),
            MMMDDYYYY: moment(val).format(dtFormat.MMMDDYYYY),
            DDMMMMYYYY: moment(val).format(dtFormat.DDMMMMYYYY),
            MMDDYYYYFormat: moment(val).format(dtFormat.MMDDYYYYFormat),
            ChatDateTime: moment(val).format(dtFormat.ChatDateTime),
            MMDDYYHHmmss: moment(val).format(dtFormat.MMDDYYHHmmss),
            hhmmss: moment(val).format(dtFormat.hhmmss)
        };
    }

    static getTimestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    static getDateDifference(dateStr: string) {
        return moment().diff(moment(dateStr), 'minute');
    }

    static getCurrentDateTime(): Date {
        return new Date(this.currentDateTime().YYYYMMDDFormat);
    }

    static convertDate(str: string): string {
        const date = new Date(str),
            month = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [date.getFullYear(), month, day].join('-');
    }

    static addDays(date: Date, days: number) {
        const newDate: Date = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    static addMonth(date: Date, month: number) {
        return new Date(date.setMonth(date.getMonth() + month));
    }

    static addYear(date: Date, year: number) {
        return new Date(date.setFullYear(date.getFullYear() + year));
    }

    static convertTime(datetime: string): string {
        if (datetime !== '') {
            const date = new Date(datetime);
            const minute = date.getMinutes();
            const hour = date.getHours();
            console.log('hh' + hour);
            console.log('mm' + minute);
            return (
                (hour < 10 ? '0' + hour : hour) +
                ':' +
                (minute < 10 ? '0' + minute : minute)
            );
        }
        return '';
    }

    static compareDate(date: string) {
        // return true when passed date is less then current datetime
        const checkDate: Date = new Date(date);
        return (new Date()) > checkDate;
    }

    static FormatDate(date: string) {
        return !isNullOrUndefined(date) && date !== ''
            ? moment(date).format('MM-DD-YYYY')
            : '';
    }

    static GlobalFormatDate(date: string) {
        return !isNullOrUndefined(date) && date !== ''
            ? moment(date).format('MM/DD/YYYY')
            : '';
    }

    static getDateFormat() {
        return 'MM/dd/yyyy';
    }

    static getDateFormatWithDateTime() {
        return 'MM/dd/yyyy hh:mm:ss';
    }
}
