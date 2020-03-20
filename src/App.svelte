<script>
	import { onMount } from 'svelte';
	import Stats from './Stats.svelte';
	import Chart from './Chart.svelte';
	import { stats, allStats } from './stores.js';

	async function mount() {
		const countryName = 'Israel';
		const countryCode = 'IL';
		// TODO: Update this every x seconds, as the data changes.
		$stats = await fetch(`https://corona.lmao.ninja/countries/${countryName}`)
			.then(r => r.json());
		$allStats = await fetch(`https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${countryCode}&timelines=1`)
			.then(r => r.json());
	}

	onMount(mount);
</script>

<main>
	<h1>Israel Coronavirus Stats</h1>
	<Stats/>
	<Chart/>
	<!-- TODO: Add link to the GitHub source. -->
</main>

<style>
	main {
		text-align: center;
		padding: 2em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		text-transform: uppercase;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>