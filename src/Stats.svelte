<script>
	import { stats } from './stores.js';
</script>

<div class="stats">
	<!-- TODO: Add date of when the stats where last updated. -->
	<span class="cases">
		Cases: {$stats['cases'].toLocaleString()}
	</span>
	<span>
		Active cases: {$stats['active'].toLocaleString()}
	</span>
	<span>
		Cases today: {$stats['todayCases'].toLocaleString()}
	</span>
	<span>
		Recovered: {$stats['recovered'].toLocaleString()}
	</span>
	<span>
		Deaths: {$stats['deaths'].toLocaleString()}
	</span>
</div>

<style>
	.stats {
		font-size: 1.7vw;
		font-weight: 200;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		align-content: space-around;
	}

	@media (max-width: 1900px) {
		.stats {
			font-size: 2.5vw;
		}
	}
	@media (max-width: 1400px) {
		.stats {
			font-size: 3vw;
		}
	}
	@media (max-width: 900px) {
		.stats {
			font-size: 4vw;
		}
	}

	.stats span {
		padding: 0 12px;
		padding-bottom: 20px;
	}
	@media (max-height: 750px) {
		.stats span {
			padding-bottom: 12px;
		}
	}

	.cases {
		margin-bottom: 8px;
		font-weight: 300;
	}
</style>
