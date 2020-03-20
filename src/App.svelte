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
	<div class="contents">
		<h1>Israel Coronavirus Stats</h1>
		<Stats/>
		<Chart/>
	</div>
	<footer>
		<span>
			Source code for this website can be found <a href="https://github.com/itaisteinherz/israel-coronavirus-stats" target="_blank">here</a>
		</span>
		<a href="https://github.com/itaisteinherz/israel-coronavirus-stats">
			<img height="24" width="24" src="assets/github.png" alt="GitHub icon" />
		</a>
	</footer>
</main>

<style>
	/* We need the grid to position the footer at the bottom of the page */
	main {
		height: 100%;
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	main .contents {
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
		main .contents {
			max-width: none;
		}
	}

	footer {
		grid-row-start: 2;
		grid-row-end: 3;
		margin-bottom: 10px;
		padding-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	footer span {
		margin-right: 7px;
	}
</style>