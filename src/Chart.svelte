<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import regression from 'regression';
	import moment from 'moment';

	import { stats, chartDataset } from './stores.js';
	import * as utils from './utils.js';

	Chart.defaults.global.legend.display = false; // Disable chart legend, as it's unnecessary.

	let mounted = false;

	let dates = [];
	let data = [];
	let showApproximation = false;
	let approximationInfo = "";

	$: {
		dates = $chartDataset['dates'];
		data = $chartDataset['data'];

		const now = moment();

		if (dates.length !== 0 && !dates.some(label => label.month() === now.month() && label.date() === now.date())) {
			dates = [...dates, now];
			data = [...data, parseInt($stats['cases'])];
		}

		showApproximation = showApproximation; // We do this so that Svelte will know to rerender the chart when the value changes.
		approximationInfo = ""; // We do this so that Svelte will clear the approximation info when the user isnt seeing the approximation.
		renderChart();
	}

	const datalabelOptions = { // TODO: Use a smaller font size on mobile devices.
		display: 'auto',
		anchor: 'end',
		clamp: true,
		align: 'left',
		offset: 6
	};
	const noDatalabels = {
		labels: {
			title: null // This disables the labels for the current dataset
		}
	};

	function renderChart() {
		if (!mounted) {
			return;
		}

		let additionalDatasets = [];

		if (showApproximation && dates.length !== 0) {
			// Calculate predicted values for the next two weeks
			const predictedDaysCount = 14;
			// Start at two weeks ago
			const startPeriodDayCount = 14;

			const startDateIndex = dates.length - startPeriodDayCount;
			const startDate = dates[startDateIndex];
			const startDay = utils.daysAfterYearBegan(startDate);

			const approximationPoints = data
				.filter((point, index) => index >= startDateIndex)
				.map((point, index) => [utils.daysAfterYearBegan(dates[startDateIndex + index]) - startDay, point]);
			const exponentialApproximation = regression.exponential(approximationPoints); // TODO: Create a separate file for regression-related logic.
			let approximationData = exponentialApproximation.points.map(point => Math.floor(point[1]));

			const lastDate = dates[dates.length - 1];
			const newDates = [];
			const newData = [];
			for (let i = 1; i < predictedDaysCount + 1; i++) {
				newDates.push(lastDate.clone().add(i, 'days'));

				const dayNumber = utils.daysAfterYearBegan(lastDate.clone()) - startDay + i;
				const predictedPoint = exponentialApproximation.predict(dayNumber);
				newData.push(Math.floor(predictedPoint[1]));
			}

			data = data.filter((point, index) => utils.daysAfterYearBegan(dates[index]) >= startDay);
			dates = [
				...(dates.filter(date => utils.differenceInDays(startDate, date) >= 0)),
				...newDates
			];
			approximationData = [...approximationData, ...newData];
			approximationInfo = `${exponentialApproximation.string} (r2 = ${exponentialApproximation.r2})`;

			additionalDatasets = [{
				label: 'Confirmed cases - Exponential Approximation',
				data: approximationData,
				borderColor: 'rgb(51, 104, 255)',
				backgroundColor: 'rgba(7, 35, 113, 0.4)',
				datalabels: datalabelOptions
			}];
		}

		const ctx = document.querySelector('.chart-canvas').getContext('2d');
		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dates.map(utils.formatLabel),
				datasets: [
					{
						label: 'Confirmed cases',
						data,
						backgroundColor: 'rgba(255, 99, 132, 0.6)',
						borderColor: 'rgb(255, 99, 132)',
						// Only show the labels when the approximation graph isn't displayed
						datalabels: showApproximation ? noDatalabels : datalabelOptions
					},
					...additionalDatasets
				]
			},
			options: {
				events: [] // Disable all events (to fix some weird Chart.js bug)
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
		<span class="approximation-info">
			{approximationInfo}
		</span>
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
