<script>
    import { stats } from './stores.js';
</script>

<div class="stats">
    <!-- TODO: Add date of when the stats where last updated. -->
    <span class="cases">
        Cases: {$stats['cases']}
    </span>
    <span>
        Active cases: {$stats['active']}
    </span>
    <span>
        Cases today: {$stats['todayCases']}
    </span>
    <span>
        Recovered: {$stats['recovered']}
    </span>
    <span>
        Deaths: {$stats['deaths']}
    </span>
</div>

<style>
    .stats {
        font-size: 1.7vw;
        font-weight: 100;
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
        padding: 7px;
        padding-bottom: 20px;
    }

    .cases {
        margin-bottom: 8px;
        font-weight: 300;
    }
</style>
