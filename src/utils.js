import moment from 'moment';

const DATE_FORMAT = 'M/D/YY';
const LABEL_FORMAT = 'DD.MM';
export const START_YEAR = 2020;
export const START_MONTH = 2;

export const parseDate = dateString => moment(dateString, DATE_FORMAT);

export const formatDate = date => date.format(DATE_FORMAT);

export const formatLabel = date => date.format(LABEL_FORMAT);

export const differenceInDays = (start, end) => moment.duration(end.diff(start)).asDays();

export const daysAfterYearBegan = date => Math.floor(differenceInDays(moment({year: START_YEAR}), date));
