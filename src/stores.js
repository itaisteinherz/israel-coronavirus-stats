import { writable, derived } from 'svelte/store';
import { parseDate, formatDate } from './utils.js';

const loadingText = "loading...";

export const stats = writable({
	active: loadingText,
	cases: loadingText,
	casesPerOneMillion: loadingText,
	country: loadingText,
	critical: loadingText,
	deaths: loadingText,
	recovered: loadingText,
	todayCases: loadingText,
	todayDeaths: loadingText
});

export const allStats = writable({
	cases: loadingText,
	deaths: loadingText,
	recovered: loadingText,
	updated: loadingText
});

export const historicalData = writable({
	timeline: {
		cases: {},
		deaths: {},
		recovered: {}
	}
});

export const chartDataset = derived(
	historicalData,
	$historicalData => {
		const casesTimeline = $historicalData['timeline']['cases'];
		const dates = Object.keys(casesTimeline)
			.map(dateString => parseDate(dateString))
			.filter(date => date.month() >= 2); // We're only interested in data starting from March 1st
		return {
			dates,
			data: dates.map(date => casesTimeline[formatDate(date)])
		};
	}
);
