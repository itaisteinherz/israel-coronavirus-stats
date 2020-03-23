import { writable, derived } from 'svelte/store';
import { countryName } from './config.js';

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
		const labels = Object.keys(casesTimeline)
			.map(date => {
				const [month, day] = date.split("/");
				return {
					date,
					month,
					day
				};
			})
			.filter(date => date.month >= 3);
		return {
			labels,
			data: labels.map(({date}) => casesTimeline[date])
		};
	}
);
