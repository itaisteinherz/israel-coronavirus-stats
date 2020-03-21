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

export const historicalData = writable([{
	country: loadingText,
	province: loadingText,
	timeline: {
		cases: {},
		deaths: {},
		recovered: {}
	}
}]);

export const countryHistory = derived(
	historicalData,
	$historicalData => $historicalData.find(country => country.country === countryName) || {
		timeline: {
			cases: {},
			deaths: {},
			recovered: {}
		}
	}
);
