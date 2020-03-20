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
