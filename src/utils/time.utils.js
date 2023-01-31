import { DateTime } from 'luxon';
import moment from 'moment';
const timeUtil = {
	convertAgeInIntervalDate: (valueAge) => {
		const now = DateTime.now();
		const birthday = now.minus({ years: valueAge });
		const startYearBirthday = birthday.startOf('year').toISODate();
		const endYearBirthday = birthday.endOf('year').toISODate();
		console.log(startYearBirthday, endYearBirthday);
		return { startYearBirthday, endYearBirthday };
	},
	convertBirthdayInAge: (birthday) => {
		const date = moment(birthday);
		const birthdayYear = date.format('YYYY');
		const age = moment().diff(birthdayYear, 'years');
		return age;
	},
	convertDateInDaysUntilToday: (date) => {
		const now = moment();
		const a = moment(date);
		const result = now.diff(a, 'days');
		return result;
	},
};

export default timeUtil;
