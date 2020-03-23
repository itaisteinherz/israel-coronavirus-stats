<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import regression from 'regression';
	import moment from 'moment';

	import { stats, chartDataset } from './stores.js';
	import * as utils from './utils.js';

	let mounted = false;

	let dates = [];
	let data = [];
	let showApproximation = false;

	$: {
		dates = $chartDataset['dates'];
		data = $chartDataset['data'];

		const now = moment();

		if (dates.length !== 0 && !dates.some(label => label.month() === now.month() && label.date() === now.date())) {
			dates = [...dates, now];
			data = [...data, parseInt($stats['cases'])];
		}

		showApproximation = showApproximation; // We do this so that Svelte will know to rerender the chart when the value changes.
		renderChart();
	}

	function renderChart() {
		if (!mounted) {
			return;
		}

		const datasets = [
			{
				label: 'Confirmed cases',
				data,
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
				borderColor: 'rgb(255, 99, 132)',
				datalabels: { // TODO: Use a smaller font size on mobile devices.
					align: 'top',
					offset: 6
				}
			}
		];

		if (showApproximation) {
			const approximationPoints = data.map((point, index) => [dates[index].date(), point]);
			const exponentialApproximation = regression.exponential(approximationPoints);

			datasets.unshift({
				label: 'Confirmed cases - Exponential Approximation',
				data: exponentialApproximation.points.map(point => point[1]),
				borderColor: '#3368FF',
				datalabels: {
					align: 'bottom',
					labels: {
						title: null // Disable labels for the approximation graph
					}
				}
			});
		}

		const ctx = document.querySelector('.chart-canvas').getContext('2d');
		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dates.map(utils.formatLabel),
				datasets
			}
		});
	}

	onMount(() => mounted = true);
</script>

<div class="chart-container">
	<div class="toggle-approximation">
		<label>
			<input type=checkbox bind:checked={showApproximation}>
			Show exponential approximation
		</label>
	</div>
	<div>
		<canvas class="chart-canvas"></canvas>
	</div>
</div>

<style>
	.chart-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	/* Disable highlighting the label text */
	.toggle-approximation label {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
	}

	.toggle-approximation input {
		margin-right: 2px;
	}
	
	.chart-container div {
		width: 1100px;
	}
	@media (max-width: 1400px) {
        .chart-container div {
            width: 1000px;
        }
	}
	@media (max-width: 1200px) {
        .chart-container div {
            width: 900px;
        }
	}
	@media (max-width: 1030px) {
        .chart-container div {
            width: 800px;
        }
	}
	@media (max-width: 900px) {
        .chart-container div {
            width: 700px;
        }
	}
	@media (max-width: 800px) {
        .chart-container div {
            width: 600px;
        }
	}
	@media (max-width: 680px) {
        .chart-container div {
            width: 520px;
        }
	}
	@media (max-width: 600px) {
        .chart-container div {
            width: 450px;
        }
	}
	@media (max-width: 560px) {
        .chart-container div {
            width: 400px;
        }
	}
	@media (max-width: 450px) {
        .chart-container div {
            width: 350px;
        }
    }
</style>
