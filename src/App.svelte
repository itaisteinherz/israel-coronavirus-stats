<script>
	import { onMount } from 'svelte';
	import Stats from './Stats.svelte';
	import Chart from './Chart.svelte';
	import { stats, historicalData } from './stores.js';
	import { countryName, countryCode } from './config.js';

	async function mount() {
		const apiBaseUrl = 'https://corona.lmao.ninja';

		// TODO: Update this every x seconds, as the data changes.
		$stats = await fetch(`${apiBaseUrl}/countries/${countryName}`)
			.then(r => r.json());
		$historicalData = await fetch(`${apiBaseUrl}/historical`)
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
		padding-top: 1em;
		margin: 0 auto;
	}
	@media (max-width: 1400px) {
		main .contents {
			padding-top: 0.5em;
		}
	}
	@media (max-width: 900px) {
		main .contents {
			padding-top: 0.25em;
		}
	}
	@media (max-width: 700px) {
		main .contents {
			padding-top: 0;
		}
	}

	h1 {
		color: #ff3e00;
		font-size: 3.5em;
		text-transform: uppercase;
		font-weight: 100;
		margin-left: 0.3em;
		margin-right: 0.3em;
	}
	@media (max-width: 750px) {
		h1 {
			font-size: 2.5em;
		}
	}

	footer {
		grid-row-start: 2;
		grid-row-end: 3;
		padding-bottom: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 400px) {
		footer {
			font-size: 16px;
		}
	}

	footer span {
		margin-right: 7px;
	}
</style>