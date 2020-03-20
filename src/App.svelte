<script>
	import { onMount } from 'svelte';
	import Stats from './Stats.svelte';
	import { stats } from './stores.js';

	async function mount() {
		const countryName = "Israel";
		$stats = await fetch(`https://corona.lmao.ninja/countries/${countryName}`).then(r => r.json());
	}

	onMount(mount);
</script>

<main>
	<h1>Israel Coronavirus Stats</h1>
	<Stats/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
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

	.stats {}
</style>