<script>
    import { stats } from './stores.js';
</script>

<div class="stats">
    <span>
        Total cases: {$stats['cases']}
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
    }

    .stats span {
        padding: 7px;
    }
</style>
