import moment, { Moment } from 'moment';
import { DATE } from '@support/Enums';

class Dates {

    /**
     *
     */
    public constructor() {
        moment.locale('tr');
    }

    /**
     * Change Internationalizm
     *
     * @param i18n
     */
    public changeLocale(i18n: string): void {
        moment.locale(i18n);
    }

    /**
     *
     * @param format
     */
    public getCurrentDateFormat(format: string): string {
        return moment().format(format);
    }

    /**
     * Get Current Date
     *
     * @returns {*}
     */
    public getCurrentDate(): string {
        return moment().format('LLLL');
    }

    public getCurrentDateTime(): string {
        return moment().format('DD/MM/YYYY HH:mm');
    }

    public getCurrentDateTimeAddDays(days: number): string {
        return moment().add(days, 'days').format('DD/MM/YYYY HH:mm');
    }

    public getCurrentBirthDayDateTimeAddDays(days: number): string {
        return moment().add(days, 'days').format('DD/MM/YYYY');
    }

    public getCurrentDateTimeSubtractDays(days: number): string {
        return moment().subtract(days, 'days').format('DD/MM/YYYY HH:mm');
    }

    public getCurrentTime(): string {
        return moment().format('HH:mm:ss');
    }

    /**
     * Add Days
     *
     * @param days
     * @returns {moment.Moment}
     */
    public addDays(days: number): Moment {
        return moment().add(days, 'days');
    }

    /**
     *
     * @param value
     * @param dateType
     * @returns {moment.Moment}
     */
    public subtract(value: number, dateType: DATE): Moment {
        return moment().subtract(value, dateType);
    }

    /**
     *
     * @param date
     * @param compareDate
     * @returns {boolean}
     */
    public isAfter(date: string, compareDate: string): boolean {
        return moment(date).isAfter(compareDate);
    }

    /**
     *
     * @param days
     * @returns {{month: string, year: string, monthShort: string, day: string}}
     */
    public addDaysNGetDateJsonFormat(days: number): { day: string; month: string; monthShort: string; year: string } {
        const date = this.addDays(days);

        return {
            day: date.format('D'),
            month: date.format('MM'),
            monthShort: date.format('MMM'),
            year: date.format('YYYY')
        };
    }

    public convertTextToDate(date: string): string {
        return moment(date, 'LLLL').format("YYYY-MM-DD HH:mm:ss");
    }

    public convertUnixTimeStampToDate(date: number): string {
        return moment.unix(date / 1000).format("YYYY-MM-DD HH:mm:ss");
    }

    public convertMilliseconds(milliseconds: number, format = ""): any {
        const total_seconds = parseInt(String(Math.floor(milliseconds / 1000)));
        const total_minutes = parseInt(String(Math.floor(total_seconds / 60)));
        const total_hours = parseInt(String(Math.floor(total_minutes / 60)));
        const days = parseInt(String(Math.floor(total_hours / 24)));

        const seconds = parseInt(String(total_seconds % 60));
        const minutes = parseInt(String(total_minutes % 60));
        const hours = parseInt(String(total_hours % 24));

        switch(format) {
            case 's':
                return total_seconds;
            case 'm':
                return total_minutes;
            case 'h':
                return total_hours;
            case 'd':
                return days;
            default:
                return { d: days, h: hours, m: minutes, s: seconds };
        }
    }
}

export default new Dates();
