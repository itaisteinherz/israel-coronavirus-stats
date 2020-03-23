import moment from 'moment';

const DATE_FORMAT = 'M/D/YY';
const LABEL_FORMAT = 'DD.MM';

export const parseDate = dateString => moment(dateString, DATE_FORMAT);

export const formatDate = date => date.format(DATE_FORMAT);

export const formatLabel = date => date.format(LABEL_FORMAT);
