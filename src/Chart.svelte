<script>
	import { onMount } from 'svelte';
	import { allStats } from './stores.js';
	import Chart from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let mounted = false;

	allStats.subscribe(stats => {
		if (!mounted) {
			return;
		}

		const confirmedTimeline = stats.locations[0]['timelines']['confirmed']['timeline'];
		const labels = Object.keys(confirmedTimeline)
			.map(date => {
				const dateObj = new Date(date);
				return {
					date,
					month: dateObj.getMonth() + 1,
					day: dateObj.getDate()
				};
			})
			.filter(date => date.month >= 3);
		const data = labels.map(({date}) => confirmedTimeline[date]);

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
	});

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
