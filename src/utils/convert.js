import { DateTime } from 'luxon';
import moment from 'moment';

export function convertAgeInIntervalDate(valueAge) {
    const now = DateTime.now();
    const birthday = now.minus({ years: valueAge });
    const startYearBirthday = birthday.startOf('year').toISODate();
    const endYearBirthday = birthday.endOf('year').toISODate();
    console.log(startYearBirthday, endYearBirthday);
    return (startYearBirthday, endYearBirthday);
}

export function convertBirthdayInAge(birthday) {
    const age = moment().diff(birthday, 'years'); 
    return age;
}

export function convertDateInDaysUntilToday(date) {
    const now = moment();
    const a = moment(date);
    const result = now.diff(a, 'days');
    return result;
}