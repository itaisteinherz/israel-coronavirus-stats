<script>
	import { onMount } from 'svelte';
	import { stats, chartDataset } from './stores.js';
	import Chart from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let mounted = false;

	let labels = [];
	let data = [];

	$: {
		labels = $chartDataset['labels'];
		data = $chartDataset['data'];

		const now = new Date();
		const month = (now.getMonth() + 1).toString();
		const day = now.getDate().toString();
		if (labels.length !== 0 && labels.findIndex(label => label.month === month && label.day === day) === -1) {
			labels = [
				...labels,
				{
					date: `${month}/${day}/${now.getFullYear()}`,
					month,
					day
				}
			];
			data = [...data, $stats['cases'].toString()];
		}

		renderChart();
	}

	function renderChart() {
		if (!mounted) {
			return;
		}

		const ctx = document.querySelector('.chart-canvas').getContext('2d');
		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels.map(date => `${date.day}.${date.month}`),
				datasets: [
					{
						label: 'Confirmed cases',
						data,
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						datalabels: { // TODO: Use a smaller font size on mobile devices.
							align: "top",
							offset: 6
						}
					}
				]
			},
			options: {}
		});
	}

	onMount(() => mounted = true);
</script>

<div class="chart-container">
	<div>
		<canvas class="chart-canvas"></canvas>
	</div>
</div>

<style>
	.chart-container {
		display: flex;
        justify-content: center;
        align-items: center;
		align-content: center;
		margin-top: 20px;
		margin-bottom: 20px;
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
