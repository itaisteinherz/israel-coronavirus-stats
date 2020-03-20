import { writable } from 'svelte/store';

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
	locations: [{
		timelines: {
			confirmed: {
				latest: loadingText,
				timeline: {}
			},
			deaths: {
				latest: loadingText,
				timeline: {}
			},
			recovered: {
				latest: loadingText,
				timeline: {}
			}
		}
	}]
});
