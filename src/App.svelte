<script>
	import { onMount } from 'svelte';
	import Stats from './Stats.svelte';
	import Chart from './Chart.svelte';
	import { stats, allStats, historicalData } from './stores.js';
	import { apiBaseUrl, countryName, countryCode } from './config.js';

	(async () => {
		// TODO: Update this every x seconds, as the data changes.
		$stats = await fetch(`${apiBaseUrl}/countries/${countryName}`)
			.then(r => r.json());
		$allStats = await fetch(`${apiBaseUrl}/all`)
			.then(r => r.json());
		$historicalData = await fetch(`${apiBaseUrl}/historical/${countryName}`)
			.then(r => r.json());
	})();
</script>

<main>
	<div class="contents">
		<h1>Israel Coronavirus Stats</h1>
		<Stats/>
		<Chart/>
		<div class="last-updated"> 
			<span>
				Stats were last updated at:
			</span>
			<span>
				{Number.isInteger($allStats['updated']) ? new Date($allStats['updated']).toUTCString() : $allStats['updated']}
			</span>
		</div>
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

	.last-updated {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		color: lightsalmon;
		font-weight: 200;
		font-size: 1em;
	}
	@media (max-width: 500px) {
		.last-updated {
			font-size: 0.85em;
		}
	}

	.last-updated span {
		padding-top: 10px;
	}

	footer {
		grid-row-start: 2;
		grid-row-end: 3;
		margin-top: 30px;
		padding-bottom: 20px;
		font-size: 16px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 400px) {
		footer {
			font-size: 14px;
		}
	}

	footer span {
		margin-right: 7px;
	}
</style>